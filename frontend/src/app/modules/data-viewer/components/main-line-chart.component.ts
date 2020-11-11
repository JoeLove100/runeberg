import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { of, Subject } from 'rxjs';
import { mergeMap} from 'rxjs/operators';
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
  selectedData: DataPoint[];
  private _currentChartSettings: LineChartSettings; 

  private settingsChangedSubject = new Subject<LineChartSettings>();
  settingsChangedAction$ = this.settingsChangedSubject.asObservable();

  private dateRangeChangedSubject = new Subject<Date[]>();
  dateRangeChangedAction$ = this.dateRangeChangedSubject.asObservable();

  private assetChangedSubject = new Subject<Asset>();
  assetChangedAction$ = this.assetChangedSubject.asObservable();

  selectedData$ = this.assetChangedAction$.pipe(
    mergeMap(asset => of(asset.id).pipe(
      mergeMap(assetId => this.marketDataService.getAssetPriceSeriesObservable(assetId))
    ))
  )

  constructor(private marketDataService: MarketDataService) {   }

  ngOnInit(): void {  
    
    this.selectedData$.subscribe((data) => {
      if(this._currentChartSettings.selectedAsset != null){
        this.selectedData = data;
        this.dateRangeChangedSubject.next(this.selectedData.map(dataPoint => dataPoint.date));
      }
    });

    this.settingsChangedAction$.subscribe(settings => {
      this._currentChartSettings = settings;
      this.redrawChart();
    })
  }

  redrawForSettings(chartSettings: LineChartSettings): void{
    if((this._currentChartSettings == null) || 
      (!this._currentChartSettings.selectedAsset.isEqualTo(chartSettings.selectedAsset))){
        this._currentChartSettings = chartSettings;
        this.assetChangedSubject.next(this._currentChartSettings.selectedAsset);
    }
    else{
        this.settingsChangedSubject.next(chartSettings);
    }
  }

  private redrawChart(): void{
    if(this.dateSliderRef != null){
      const [minDate, maxDate] = this.dateSliderRef.getSelectedDates();
      let filteredData = this.selectedData.filter(dataPoint => (minDate <= dataPoint.date) && (dataPoint.date <= maxDate))
      this.chartRef.drawChart(this._currentChartSettings, filteredData);
    }
    else{
      this.chartRef.drawChart(this._currentChartSettings, this.selectedData);
    }
  };
}
