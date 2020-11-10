import { Observable } from 'rxjs'
import { map, shareReplay, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Asset, DataPoint } from '../shared/shared.market-data';

const baseUrl = "http://localhost:8000/dataviewer/api"
const dataStart = "2015-01-01"

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {

  constructor(private http: HttpClient) { }

  allAssets$ = this.http.get<Asset[]>(`${baseUrl}/assets/`).pipe(
    map(assets => {
      return assets.map( asset => new Asset(
        +asset["assetid"],
        asset["assetname"],
        asset["assetdisplayname"]
      ))
    })
  )

  getPriceSeriesObservable(assetId: number, start?: string): Observable<DataPoint[]>{
    if(start == null){
      start = dataStart;
    }
    return this.http.get<DataPoint[]>(`${baseUrl}/data/${assetId}/?datatype=price&start_date=${start}`).pipe(
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
}
