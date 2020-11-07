import { Chart } from 'chart.js'
import { Component, ViewChild } from '@angular/core';
import { Asset, DataPoint } from '../../shared/shared.market-data'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {

  @ViewChild('lineChart',{static: true}) private lineChartRef: any;
  chart: any;

  constructor() { }

  
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

}
