import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Asset, DataPoint } from '../shared/shared.market-data';

const baseUrl = "http://localhost:8000/dataviewer/api"
const dataStart = "2020-01-01"

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {

  constructor(private http: HttpClient) { }

  getDummyAssets(): Asset[]{
    return [
      {name: "Asset A", id: 1, displayName: "Asset A"}, 
      {name: "Asset B", id: 2, displayName: "Asset B"}, 
      {name: "Asset C", id: 3, displayName: "Asset C"}]
  }

  allAssets$ = this.http.get<Asset[]>(`${baseUrl}/assets/`).pipe(
    map(assets => {
      return assets.map( asset => new Asset(
        +asset["assetid"],
        asset["assetname"],
        asset["assetdisplayname"]
      ))
    })
  )

  getPriceSeriesObservable(assetId: number): Observable<DataPoint[]>{
    return this.http.get<DataPoint[]>(`${baseUrl}/data/${assetId}?datatype=price&start_date=${dataStart}`).pipe(
      map(dataPoints => {
        let timeSeries =  dataPoints.map(dataPoint => new DataPoint(
          new Date(dataPoint["asofdate"]),
          +dataPoint["datavalue"]
        ))
        timeSeries.sort((p1, p2) => {
          if (p1.date > p2.date){
            return 1
          }
          if (p1.date < p2.date){
            return -1
          }
          return 0
        })
        return timeSeries
      })
    )
  }

  getDummyData(assetId: number): DataPoint[] {
    if (assetId === 162){
      return [
        new PriceDataPoint(new Date(2020, 1, 1), 1),
        new PriceDataPoint(new Date(2020, 1, 2), 2),
        new PriceDataPoint(new Date(2020, 1, 3), 3)
      ]
    }
    else if (assetId == 163){
      return [
        new PriceDataPoint(new Date(2020, 1, 1), 2),
        new PriceDataPoint(new Date(2020, 1, 2), 1),
        new PriceDataPoint(new Date(2020, 1, 3), 3)
      ]
    }
    else{
      return [
        new PriceDataPoint(new Date(2020, 1, 1), 3),
        new PriceDataPoint(new Date(2020, 1, 2), 2),
        new PriceDataPoint(new Date(2020, 1, 3), 1)
      ]
    }
  }
}


export class PriceDataPoint implements DataPoint{
  date: Date;
  value: number;

  constructor(date: Date, 
    price: number){
      this.date = date;
      this.value = price;
    }

}