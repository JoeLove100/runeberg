import {  ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Chart }  from 'chart.js'
import { BehaviorSubject, EMPTY, combineLatest, from, of, forkJoin } from 'rxjs';
import { catchError, map, mergeMap, tap, toArray, withLatestFrom } from 'rxjs/operators';
import { MarketDataService } from '../../../services/market-data.service'
import { Asset, DataPoint } from '../../../shared/shared.market-data'

@Component({
  selector: 'app-main-line-chart',
  templateUrl: './main-line-chart.component.html',
  styleUrls: ['./main-line-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLineChartComponent implements OnInit{

  @ViewChild('lineChart',{static: true}) private lineChartRef: any;
  chart: any;
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

  constructor(private marketDataService: MarketDataService) {   }

  ngOnInit(): void {  
    
    this.selectedData$.pipe(
      withLatestFrom(this.selectedAsset$)
    ).subscribe(([data, asset]) => {
      console.log(`Plotting data for ${asset.displayName}`);
      this.drawChart(asset, data);
    })

  }

  drawChart(selectedAsset: Asset,
    selectedData: DataPoint[]): void{

    if (this.chart){
      this.chart.destroy()
    }
    
    console.log(`Now drawing chart for ${selectedAsset.displayName}....`)
    this.chart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: selectedData.map(dataPoint => dataPoint.date),
        datasets: [{
          data: selectedData.map(dataPoint => dataPoint.value),
          fill: false,
          label: selectedAsset.displayName
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              tooltipFormat: 'YYYY-MM-DD',
              unit: 'month'
            },
            distribution: 'series'
          }]
        }
      }
    })
  }

  onSelectedAssetChanged(){
    console.log(this.selectedId)
    this.assetSelectedSubject.next(+this.selectedId)
  }
}
