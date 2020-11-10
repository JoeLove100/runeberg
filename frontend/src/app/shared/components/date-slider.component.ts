import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { formatDate } from '@angular/common'
import {Options} from '@angular-slider/ngx-slider'
import { FormControl, FormGroup } from '@angular/forms';
import { binarySearch, DateHelper } from '../utils';
import { SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.css']
})
export class DateSliderComponent implements OnInit, OnChanges{

  datesForm: FormGroup;
  dateInputLo: FormControl;
  dateInputHi: FormControl;
  @Input() allDates: Date[];
  @Output() datesChanged = new EventEmitter()
  value: number;
  highValue: number;
  options: Options;
  dateInputLoMin: string;
  dateInputLoMax: string;
  dateInputHiMin: string;
  dateInputHiMax: string;
  public get datePeriod(): typeof DatePeriod {
    return DatePeriod
  }

  constructor() {  }

  ngOnChanges(changes: SimpleChanges): void{
    let dateChange = changes["allDates"]
    console.log(dateChange)
    if(!dateChange.firstChange){
      console.log(`Changes are ${changes}`)
      this.initialiseForDates()  
    };
  }

  private datesChangedSubject = new Subject<Date[]>();
  datesChangedAction$ = this.datesChangedSubject.asObservable();


  ngOnInit(){
    
    this.dateInputLo = new FormControl("");
    this.dateInputHi = new FormControl("");

    this.datesForm = new FormGroup({
      dateInputLo: this.dateInputLo,
      dateInputHi: this.dateInputHi
    })

    this.initialiseForDates();

    this.datesChangedAction$.subscribe(dates => {
        let [loDate, hiDate] = dates;
        this.value = binarySearch(this.allDates, new Date(loDate))
        this.highValue = binarySearch(this.allDates, new Date(hiDate))
        console.log(`New slider values are ${this.value} and ${this.highValue} now`)
        this.setSelectedDates();
    })
  };

  initialiseForDates(): void{
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
    this.setSelectedDates();
  }

  onDateChangeManual(): void{
    let dates = [this.dateInputLo.value, this.dateInputHi.value]
    this.datesChangedSubject.next(dates);
  }

  onPeriodButtonClicked(period: DatePeriod): void{

    console.log("button pushed")
    this.highValue = this.allDates.length - 1
    let endDate = this.allDates[this.highValue];
    switch(period){
      case DatePeriod.MTD: {
        let startDate = DateHelper.getPrevMonthEnd(endDate);
        this.value = binarySearch(this.allDates, startDate);
        break;
      }
      case DatePeriod.QTD: {
        let startDate = DateHelper.getPrevQuarterEnd(endDate);
        this.value = binarySearch(this.allDates, startDate);
        break;
      }
      case DatePeriod.YTD: {
        let startDate = DateHelper.getPrevYearEnd(endDate);
        this.value = binarySearch(this.allDates, startDate);
        break;
      }
      case DatePeriod.MAX: {
        this.value = 0
      }

    }
    this.setSelectedDates();
  }

  getSelectedDates(): Date[]{
    let minDate = this.allDates[this.value];
    let maxDate = this.allDates[this.highValue];
    return [minDate, maxDate]
  }

  formatForInput(date: Date): string{
    return formatDate(date, "yyyy-MM-dd", "en-UK");
  }

  setSelectedDates(): void{

    let loDate = this.allDates[this.value];
    this.dateInputLo.setValue(this.formatForInput(loDate));
    this.dateInputHiMin = this.formatForInput(loDate)
    
    let hiDate = this.allDates[this.highValue];
    this.dateInputHi.setValue(this.formatForInput(hiDate))
    this.dateInputLoMax = this.formatForInput(hiDate)

    this.datesChanged.emit();
  }

}


enum DatePeriod {
  MTD,
  QTD,
  YTD,
  MAX
}
