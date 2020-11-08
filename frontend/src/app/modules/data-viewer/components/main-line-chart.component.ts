import {  ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, EMPTY, combineLatest, of, Subject } from 'rxjs';
import { catchError, first, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { LineChartComponent } from 'src/app/shared/components/line-chart.component';
import { Asset, DataPoint } from 'src/app/shared/shared.market-data';
import { isNull } from 'util';
import { MarketDataService } from '../../../services/market-data.service'

@Component({
  selector: 'app-main-line-chart',
  templateUrl: './main-line-chart.component.html',
  styleUrls: ['./main-line-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLineChartComponent implements OnInit{

  @ViewChild('lineChart') private chartRef: LineChartComponent;
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
        this.redrawChart();
      }
    })
  }

  onSelectedAssetChanged(){
    console.log(this.selectedAsset.id)
    this.assetSelectedSubject.next(this.selectedAsset)
  };

  redrawChart(): void{
    this.chartRef.drawChart(this.selectedAsset, this.selectedData);
  };
}
