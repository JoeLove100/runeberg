import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { DataViewerComponent } from './components/data-viewer.component';
import { MainLineChartComponent } from './components/main-line-chart.component';
import { DataViewerMenuComponent } from './components/data-viewer-menu.component';
import { IndexChartStripComponent } from './components/index-chart-strip.component';

@NgModule({
  declarations: 
  [
    DataViewerComponent, 
    MainLineChartComponent, 
    DataViewerMenuComponent, 
    IndexChartStripComponent
  ],
  imports: 
  [
    SharedModule
  ],
  exports:
  [
    DataViewerComponent,
    IndexChartStripComponent
  ]
})
export class DataViewerModule { }
