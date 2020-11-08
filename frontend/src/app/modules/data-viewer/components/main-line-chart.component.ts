import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, EMPTY, of, Subject } from 'rxjs';
import { catchError, mergeMap} from 'rxjs/operators';
import { DateSliderComponent } from 'src/app/shared/components/date-slider.component';
import { LineChartComponent } from 'src/app/shared/components/line-chart.component';
import { Asset, DataPoint } from 'src/app/shared/shared.market-data';
import { MarketDataService } from '../../../services/market-data.service'

@Component({
  selector: 'app-main-line-chart',
  templateUrl: './main-line-chart.component.html',
  styleUrls: ['./main-line-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLineChartComponent implements OnInit{

  @ViewChild('lineChart') private chartRef: LineChartComponent;
  @ViewChild('dateSlider', {static: false}) private dateSliderRef: DateSliderComponent;
  selectedAsset: Asset;
  selectedData: DataPoint[];

  private assetSelectedSubject = new BehaviorSubject<Asset>(new Asset(162, "coal", "Coal"));
  assetSelectedAction$ = this.assetSelectedSubject.asObservable();

  private dateRangeChangedSubject = new Subject<Date[]>();
  dateRangeChangedAction$ = this.dateRangeChangedSubject.asObservable();

  availableAssets$ = this.marketDataService.allAssets$.pipe(
    catchError(err => {
      console.log(`Error in available assets: ${err}`)
      return EMPTY;
    })
  )

  selectedData$ = this.assetSelectedAction$.pipe(
    mergeMap(selectedAsset => of(selectedAsset.id).pipe(
      mergeMap(assetId => this.marketDataService.getPriceSeriesObservable(assetId))
    ))
  )

  constructor(private marketDataService: MarketDataService) {   }

  ngOnInit(): void {  
    
    this.selectedData$.subscribe((data) => {
      if(this.selectedAsset != null){
        this.selectedData = data;
        this.dateRangeChangedSubject.next(this.selectedData.map(dataPoint => dataPoint.date));
      }
    });
  }

  onSelectedAssetChanged(){
    this.assetSelectedSubject.next(this.selectedAsset)
  };

  redrawChart(): void{
    if(this.dateSliderRef != null){
      const [minDate, maxDate] = this.dateSliderRef.getSelectedDates();
      let filteredData = this.selectedData.filter(dataPoint => (minDate <= dataPoint.date) && (dataPoint.date <= maxDate))
      this.chartRef.drawChart(this.selectedAsset, filteredData);
    }
  };
}
