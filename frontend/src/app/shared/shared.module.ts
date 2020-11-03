import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateSliderComponent } from './components/date-slider.component'
import { NgxSliderModule } from '@angular-slider/ngx-slider'

@NgModule({
  declarations: [DateSliderComponent],
  imports: [
    CommonModule,
    NgxSliderModule
  ],
  exports: [
  CommonModule,
  FormsModule,
  DateSliderComponent
 ]
})
export class SharedModule { }
