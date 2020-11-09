import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateSliderComponent } from './components/date-slider.component'
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LineChartComponent } from './components/line-chart.component'

@NgModule({
  declarations: [
    DateSliderComponent, 
    LineChartComponent],
  imports: [
    CommonModule,
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  DateSliderComponent,
  LineChartComponent
 ]
})
export class SharedModule { }
