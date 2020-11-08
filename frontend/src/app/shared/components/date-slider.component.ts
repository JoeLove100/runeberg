import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { formatDate } from '@angular/common'
import {Options} from '@angular-slider/ngx-slider'
import { FormControl, FormGroup } from '@angular/forms';
import { binarySearch } from '../utils';
import { debounceTime, skipWhile, tap } from 'rxjs/operators';
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
  private beingUpdated: boolean;

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
    console.log("Manual date change occurred")
    let dates = [this.dateInputLo.value, this.dateInputHi.value]
    this.datesChangedSubject.next(dates);
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

    this.beingUpdated = true;

    let loDate = this.allDates[this.value];
    this.dateInputLo.setValue(this.formatForInput(loDate));
    this.dateInputHiMin = this.formatForInput(loDate)
    
    let hiDate = this.allDates[this.highValue];
    this.dateInputHi.setValue(this.formatForInput(hiDate))
    this.dateInputLoMax = this.formatForInput(hiDate)

    this.beingUpdated = false;
    
    this.datesChanged.emit();
  }

}
