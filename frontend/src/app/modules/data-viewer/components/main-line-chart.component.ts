import {  ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, EMPTY, combineLatest, of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { LineChartComponent } from 'src/app/shared/components/line-chart.component';
import { DataPoint } from 'src/app/shared/shared.market-data';
import { MarketDataService } from '../../../services/market-data.service'

@Component({
  selector: 'app-main-line-chart',
  templateUrl: './main-line-chart.component.html',
  styleUrls: ['./main-line-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLineChartComponent implements OnInit{

  @ViewChild('lineChart') private chartRef: LineChartComponent;
  selectedId: number;

  private assetSelectedSubject = new BehaviorSubject<number>(162);
  assetSelectedAction$ = this.assetSelectedSubject.asObservable();

  availableAssets$ = this.marketDataService.allAssets$.pipe(
    catchError(err => {
      console.log(`Error in available assets: ${err}`)
      return EMPTY;
    })
  )

  selectedAsset$ = combineLatest([
    this.availableAssets$,
    this.assetSelectedAction$
  ]).pipe(
    map(([availableAssets, selectedId]) => {
      this.selectedId = selectedId;
      return availableAssets.find(asset => asset.id === selectedId)
    })
  )

  selectedData$ = this.selectedAsset$.pipe(
    mergeMap(selectedAsset => of(selectedAsset.id).pipe(
      mergeMap(assetId => this.marketDataService.getPriceSeriesObservable(assetId))
    ))
  )

  selectedDates$ = this.selectedData$.pipe(
    map(data => {
      return data.map(dataPoint => dataPoint.date)
    })
  )

  constructor(private marketDataService: MarketDataService) {   }

  ngOnInit(): void {  
    
    this.selectedData$.pipe(
      withLatestFrom(this.selectedAsset$)
    ).subscribe(([data, asset]) => {
      this.chartRef.drawChart(asset, data);
    })
  }

  onSelectedAssetChanged(){
    console.log(this.selectedId)
    this.assetSelectedSubject.next(+this.selectedId)
  }

  getDatesFromData(data: DataPoint[]): Date[]{
      return data.map(dataPoint => dataPoint.date);
  }

  testFunction(data: DataPoint[]): DataPoint[]{
    return data
  }
}
