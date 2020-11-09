import { Component, OnInit, ViewChild } from '@angular/core';
import { DataViewerMenuComponent, LineChartSettings } from './data-viewer-menu.component';
import { MainLineChartComponent } from './main-line-chart.component';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
export class DataViewerComponent implements OnInit {

  @ViewChild('chartMain') private chartMain: MainLineChartComponent
  @ViewChild('chartMenu') private chartMenu: DataViewerMenuComponent 

  constructor() { }

  ngOnInit(): void {
  }

  onChartSettingsChanged(){
    console.log("Detected a change in the chart settings")
    const chartSettings = this.chartMenu.getSettings() as LineChartSettings;
    this.chartMain.redrawForSettings(chartSettings);
  }
}
