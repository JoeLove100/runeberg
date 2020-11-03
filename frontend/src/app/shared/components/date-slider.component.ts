import { Component, OnInit } from '@angular/core';
import {Options} from '@angular-slider/ngx-slider'
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.css']
})
export class DateSliderComponent {

  sortedDates: Date[];
  value: number;
  highValue: number;
  options: Options;

  constructor() {}

  setDates(dates: Date[]): void{
  
  this.sortedDates = dates.sort((dt1, dt2) => {
    if (dt1 > dt2) {
      return 1;
    }
    else if (dt1 < dt2){
      return -1;
    }
    return 0;
  }) 
  
  this.value = 0;
  this.highValue = this.sortedDates.length - 1;
  this.options = {
    floor: this.value,
    ceil: this.highValue,
    hideLimitLabels: true,
    autoHideLimitLabels: true
    };
  };

  getSelectedDates(): Date[]{
    let minDate = this.sortedDates[this.value];
    let maxDate = this.sortedDates[this.highValue];
    return [minDate, maxDate]
  }

}
