import { Chart } from 'chart.js'
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DataPoint } from '../../shared/shared.market-data'
import { LineChartSettings } from 'src/app/modules/data-viewer/components/data-viewer-menu.component';
import { priceToCumulativeReturns } from '../utils'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {

  @ViewChild('lineChart',{static: true}) private lineChartRef: any;
  chart: any;

  constructor() { }

  
  drawChart(chartSettings: LineChartSettings,
    selectedData: DataPoint[]): void{

    if (this.chart){
      this.chart.destroy()
    }

    if(chartSettings.showReturns){
      selectedData = priceToCumulativeReturns(selectedData);
    }
    
    console.log(`Now drawing chart for ${chartSettings.selectedAsset.displayName}....`)
    this.chart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: selectedData.map(dataPoint => dataPoint.date),
        datasets: [{
          data: selectedData.map(dataPoint => dataPoint.value),
          fill: false,
          label: chartSettings.selectedAsset.displayName
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
          }],
          yAxes: [{
            ticks: {
              callback: (tick: number) => {
                if(chartSettings.showReturns){
                  return (tick * 100).toString() + "%"
                }
                else{
                  return tick.toString();
                }
              }
            }
          }]}
      }
    })
  }

}
