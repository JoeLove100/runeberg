import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common'
import {Options} from '@angular-slider/ngx-slider'
import { FormControl, FormGroup } from '@angular/forms';
import { binarySearch } from '../utils';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.css']
})
export class DateSliderComponent implements OnInit{

  datesForm: FormGroup;
  dateInputLo: FormControl;
  dateInputHi: FormControl;
  @Input() allDates: Date[];
  value: number;
  highValue: number;
  options: Options;
  dateInputLoMin: string;
  dateInputLoMax: string;
  dateInputHiMin: string;
  dateInputHiMax: string;
  private beingUpdated: boolean;

  constructor() {  }

  ngOnInit(){
    
    this.value = 0;
    this.dateInputLoMin = this.formatForInput(this.allDates[this.value])
    this.highValue = this.allDates.length - 1;
    this.dateInputHiMax = this.formatForInput(this.allDates[this.highValue])
    this.options = {
      floor: 0,
      ceil: this.allDates.length - 1,
      hideLimitLabels: true,
      hidePointerLabels: true   
    };

    this.dateInputLo = new FormControl("");
    this.dateInputHi = new FormControl("");

    this.datesForm = new FormGroup({
      dateInputLo: this.dateInputLo,
      dateInputHi: this.dateInputHi
    })

    this.setSelectedDates();

    this.dateInputLo.valueChanges.pipe(
      debounceTime(1500)
    ).subscribe(value => {
      if(!this.beingUpdated){
        this.value = binarySearch(this.allDates, new Date(value));
        this.setSelectedDates();
      }
    });

    this.dateInputHi.valueChanges.pipe(
      debounceTime(1500)
    ).subscribe(value => {
      if(!this.beingUpdated){
        this.highValue = binarySearch(this.allDates, new Date(value));
        this.setSelectedDates();
      }
    })

  };

  getSelectedDates(): Date[]{
    let minDate = this.allDates[this.value];
    let maxDate = this.allDates[this.highValue];
    return [minDate, maxDate]
  }

  formatForInput(date: Date): string{
    return formatDate(date, "yyyy-MM-dd", "en-UK");
  }

  setSelectedDates(): void{

    this.beingUpdated = true;

    let loDate = this.allDates[this.value];
    this.dateInputLo.setValue(this.formatForInput(loDate));
    this.dateInputHiMin = this.formatForInput(loDate)
    
    let hiDate = this.allDates[this.highValue];
    this.dateInputHi.setValue(this.formatForInput(hiDate))
    this.dateInputLoMax = this.formatForInput(hiDate)

    this.beingUpdated = false;
  }

}
