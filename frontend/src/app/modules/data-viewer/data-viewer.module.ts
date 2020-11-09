import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { DataViewerComponent } from './components/data-viewer.component';
import { MainLineChartComponent } from './components/main-line-chart.component';
import { DataViewerMenuComponent } from './components/data-viewer-menu.component';

@NgModule({
  declarations: 
  [
    DataViewerComponent, 
    MainLineChartComponent, DataViewerMenuComponent
  ],
  imports: 
  [
    SharedModule
  ],
  exports:
  [
    DataViewerComponent
  ]
})
export class DataViewerModule { }
