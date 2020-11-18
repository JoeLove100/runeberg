import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { mergeMap, take, toArray } from 'rxjs/operators';
import { MarketDataService } from '../../../services/market-data.service'
import { DateHelper } from '../../../shared/utils'

@Component({
  selector: 'app-index-chart-strip',
  templateUrl: './index-chart-strip.component.html',
  styleUrls: ['./index-chart-strip.component.css']
})
export class IndexChartStripComponent implements OnInit {

  chartStartDate: string;

  constructor(private marketDataService: MarketDataService) { }

  indices$ = this.marketDataService.allIndices$.pipe(
    take(6),
    mergeMap(indices => from(indices).pipe(
      mergeMap(index => this.marketDataService.getIndexPriceSeriesObservable(index, this.chartStartDate)),
      toArray()
    ))
  );

  ngOnInit(): void {
    this.chartStartDate = DateHelper.getAsString(DateHelper.getNDaysBeforeToday(10));
  }

}
