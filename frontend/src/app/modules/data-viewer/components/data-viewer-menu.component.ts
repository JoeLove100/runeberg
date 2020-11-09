import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Asset } from 'src/app/shared/shared.market-data';
import { MarketDataService } from '../../../services/market-data.service'


@Component({
  selector: 'app-data-viewer-menu',
  templateUrl: './data-viewer-menu.component.html',
  styleUrls: ['./data-viewer-menu.component.css']
})
export class DataViewerMenuComponent implements OnInit {

  selectedAsset: Asset;
  
  private assetSelectedSubject = new BehaviorSubject<Asset>(new Asset(162, "coal", "Coal"));
  assetSelectedAction$ = this.assetSelectedSubject.asObservable();

  availableAssets$ = this.marketDataService.allAssets$.pipe(
    catchError(err => {
      console.log(`Error in available assets: ${err}`)
      return EMPTY;
    })
  )

  onSelectedAssetChanged(){
    this.assetSelectedSubject.next(this.selectedAsset)
  };

  constructor(private marketDataService: MarketDataService) { }

  ngOnInit(): void {
  }

  

}
