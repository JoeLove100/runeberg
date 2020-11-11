import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Asset, DataPoint, Index } from '../shared/shared.market-data';

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
      ));
    })
  );

  allIndices$ = this.http.get<Index[]>(`${baseUrl}/indices/`).pipe(
    map(indices => {
      return indices.map(index => new Index(
        +index["indexid"],
        index["indexname"],
        index["indexdisplayname"]
      ));
    })
  );

  private getPriceSeriesObservable(assetId: number, start: string, url: string): Observable<DataPoint[]>{
    return this.http.get<DataPoint[]>(url).pipe(
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
  };

  getAssetPriceSeriesObservable(assetId: number, start?: string): Observable<DataPoint[]>{
    if(start == null){
      start = dataStart;
    }
    let url = `${baseUrl}/data/${assetId}/?datatype=price&start_date=${start}`;
    return this.getPriceSeriesObservable(assetId, start, url);
  }

  getIndexPriceSeriesObservable(indexId: number, start?: string): Observable<DataPoint[]>{
    if(start == null){
      start = dataStart;
    }
    let url = `${baseUrl}/index_data/${indexId}/?start_date=${start}`;
    return this.getPriceSeriesObservable(indexId, start, url);
  }
}
