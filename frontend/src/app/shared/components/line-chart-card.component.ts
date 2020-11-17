import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LineChartSettings } from 'src/app/modules/data-viewer/components/data-viewer-menu.component';
import { Asset } from '../shared.market-data';
import { LineChartComponent } from './line-chart.component';

@Component({
  selector: 'app-line-chart-card',
  templateUrl: './line-chart-card.component.html',
  styleUrls: ['./line-chart-card.component.css']
})
export class LineChartCardComponent implements OnInit, AfterViewInit {
  
  @Input() asset: Asset;
  @ViewChild('lineChart') private lineChartRef: LineChartComponent;
  settings: LineChartSettings;

  constructor() { }

  ngOnInit(): void {
    this.settings = new LineChartSettings(this.asset, true)
  }

  ngAfterViewInit(): void {
    this.lineChartRef.drawChart(this.settings, this.asset)
  }

}
