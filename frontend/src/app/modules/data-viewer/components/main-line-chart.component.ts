import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, EMPTY, of, Subject } from 'rxjs';
import { catchError, mergeMap} from 'rxjs/operators';
import { DateSliderComponent } from 'src/app/shared/components/date-slider.component';
import { LineChartComponent } from 'src/app/shared/components/line-chart.component';
import { Asset, DataPoint } from 'src/app/shared/shared.market-data';
import { MarketDataService } from '../../../services/market-data.service'
import { LineChartSettings } from './data-viewer-menu.component';

@Component({
  selector: 'app-main-line-chart',
  templateUrl: './main-line-chart.component.html',
  styleUrls: ['./main-line-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLineChartComponent implements OnInit{

  @ViewChild('lineChart') private chartRef: LineChartComponent;
  @ViewChild('dateSlider') private dateSliderRef: DateSliderComponent;
  chartSettings: LineChartSettings;
  selectedData: DataPoint[];

  private settingsChangedSubject = new Subject<LineChartSettings>();
  settingsChangedAction$ = this.settingsChangedSubject.asObservable();

  private dateRangeChangedSubject = new Subject<Date[]>();
  dateRangeChangedAction$ = this.dateRangeChangedSubject.asObservable();

  selectedData$ = this.settingsChangedAction$.pipe(
    mergeMap(lineChartSettings => of(lineChartSettings.selectedAsset.id).pipe(
      mergeMap(assetId => this.marketDataService.getPriceSeriesObservable(assetId))
    ))
  )

  constructor(private marketDataService: MarketDataService) {   }

  ngOnInit(): void {  
    
    this.selectedData$.subscribe((data) => {
      if(this.chartSettings.selectedAsset != null){
        this.selectedData = data;
        this.dateRangeChangedSubject.next(this.selectedData.map(dataPoint => dataPoint.date));
      }
    });
  }

  redrawForSettings(chartSettings: LineChartSettings): void{
    this.chartSettings = chartSettings;
    this.settingsChangedSubject.next(chartSettings);
  }

  private redrawChart(): void{
    if(this.dateSliderRef != null){
      const [minDate, maxDate] = this.dateSliderRef.getSelectedDates();
      let filteredData = this.selectedData.filter(dataPoint => (minDate <= dataPoint.date) && (dataPoint.date <= maxDate))
      this.chartRef.drawChart(this.chartSettings, filteredData);
    }
  };
}
