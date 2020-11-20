import { AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LineChartSettings } from 'src/app/modules/data-viewer/components/data-viewer-menu.component';
import { Asset } from '../shared.market-data';
import { priceToCumulativeReturns } from '../utils';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-line-chart-card',
  templateUrl: './line-chart-card.component.html',
  styleUrls: ['./line-chart-card.component.css']
})
export class LineChartCardComponent implements OnInit, AfterViewChecked {
  
  @Input() asset: Asset;
  @ViewChild('lineChart', {static: true}) private lineChartRef: any;
  settings: LineChartSettings;
  chart: any;
  periodReturn: number;

  constructor() { }

  ngOnInit(): void {
    this.settings = new LineChartSettings(this.asset, true)
    this.periodReturn = this.asset.getTotalReturn();
    this.drawChart(this.settings, this.asset)
  }

  ngAfterViewChecked(): void {
  }


  drawChart(chartSettings: LineChartSettings,
    selectedAsset: Asset,
    startDate?: Date,
    endDate?: Date): void{

    if (this.chart){
      this.chart.destroy()
    }

    let dataToPlot = selectedAsset.data;
    if(chartSettings.showReturns){  
      dataToPlot = priceToCumulativeReturns(dataToPlot);
    }
    if(startDate){
      dataToPlot = dataToPlot.filter(dataPoint => (startDate <= dataPoint.date));
    }
    if(endDate){
      dataToPlot = dataToPlot.filter(DataPoint => (DataPoint.date <= endDate))
    }
    
    this.chart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: dataToPlot.map(dataPoint => dataPoint.date),
        datasets: [{
          data: dataToPlot.map(dataPoint => dataPoint.value),
          fill: false,
          pointRadius: 0,
          borderColor: "rgba(0, 0, 0)",
          label: selectedAsset.displayName
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            },
            type: 'time',
            time: {
              tooltipFormat: 'YYYY-MM-DD',
              unit: 'month'
            },
            distribution: 'series'
          }],
          yAxes: [{
            ticks: {
              display: false,
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
