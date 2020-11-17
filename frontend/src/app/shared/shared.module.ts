import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateSliderComponent } from './components/date-slider.component'
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LineChartComponent } from './components/line-chart.component';
import { LineChartCardComponent } from './components/line-chart-card.component'

@NgModule({
  declarations: [
    DateSliderComponent, 
    LineChartComponent, 
    LineChartCardComponent],
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
  LineChartComponent,
  LineChartCardComponent
 ]
})
export class SharedModule { }
