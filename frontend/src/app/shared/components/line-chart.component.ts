import { Chart } from 'chart.js'
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Asset, DataPoint } from '../../shared/shared.market-data'
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

  private getUnitForDataLength(dataLength: number): string {

    if (dataLength > 3000){
      return "year";
    }
    else if ((500 < dataLength) && (dataLength <= 3000)){
      return "quarter";
    }
    else if ((200 < dataLength) && (dataLength <= 500)){
      return "month";
    }
    else if ((40 < dataLength) && (dataLength <= 200)){
      return "week";
    }
    else {
      return "day";
    }
  }

  
  drawChart(chartSettings: LineChartSettings,
    selectedAsset: Asset,
    startDate?: Date,
    endDate?: Date): void{

    if (this.chart){
      this.chart.destroy()
    }

    let dataToPlot = selectedAsset.data;
    if(startDate){
      dataToPlot = dataToPlot.filter(dataPoint => (startDate <= dataPoint.date));
    }
    if(endDate){
      dataToPlot = dataToPlot.filter(DataPoint => (DataPoint.date <= endDate))
    }
    if(chartSettings.showReturns){  
      dataToPlot = priceToCumulativeReturns(dataToPlot);
    }
    
    this.chart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: dataToPlot.map(dataPoint => dataPoint.date),
        datasets: [{
          data: dataToPlot.map(dataPoint => dataPoint.value),
          fill: false,
          pointRadius: dataToPlot.length < 300 ? 4: 0,
          borderColor: "rgba(0, 0, 0)",
          label: selectedAsset.displayName
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          position: "top",
          fontFamily: "Bloomberg",
          fontColor: "black",
          fontSize: 24,
          text: `Historic ${chartSettings.showReturns ? "returns" : "price"} data for ${selectedAsset.displayName.toLowerCase()}`
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true
            },
            ticks: {
              maxTicksLimit: 20,
              display: true
            },
            type: 'time',
            time: {
              tooltipFormat: 'YYYY-MM-DD',
              unit: this.getUnitForDataLength(dataToPlot.length)
            },
            distribution: 'series'
          }],
          yAxes: [{
            ticks: {
              display: true,
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
