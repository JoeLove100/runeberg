import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { DataViewerComponent } from './components/data-viewer.component';
import { MainLineChartComponent } from './components/main-line-chart.component';

@NgModule({
  declarations: 
  [
    DataViewerComponent, 
    MainLineChartComponent
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
