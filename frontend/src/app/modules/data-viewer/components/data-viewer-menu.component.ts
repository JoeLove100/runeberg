import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  rootForm: FormGroup;
  assetSelectFormControl = new FormControl("");
  showReturnsCheckoxControl = new FormControl("");
 @Output() settingsChanged = new EventEmitter();
  private _settings: LineChartSettings;

  private assetSelectedSubject = new BehaviorSubject<Asset>(new Asset(162, "coal", "Coal"));
  assetSelectedAction$ = this.assetSelectedSubject.asObservable();

  availableAssets$ = this.marketDataService.allAssets$.pipe(
    catchError(err => {
      console.log(`Error in available assets: ${err}`)
      return EMPTY;
    })
  )

  constructor(private marketDataService: MarketDataService) { }

  ngOnInit(): void {

    this.rootForm = new FormGroup({
      assetSelect: this.assetSelectFormControl,
      showReturns: this.showReturnsCheckoxControl
    })
  }

  private getSettingsFromControls(): LineChartSettings{
    let selectedAsset = this.assetSelectFormControl.value;
    if(selectedAsset === ""){
      selectedAsset = new Asset(-1, "", "");  // bit of a hack, would like it to return null from value
    }
    let showReturns = this.showReturnsCheckoxControl.value as boolean;
    return new LineChartSettings(selectedAsset as Asset, showReturns);
  }

  getSettings(): LineChartSettings{
    return this._settings;
  }

  onSettingsChangedEvent(){
    let newSettings = this.getSettingsFromControls();
    if(this._settings == null || !newSettings.isEqualTo(this._settings)){
      this._settings = newSettings
      console.log("Settings changed event")
      this.settingsChanged.emit();
    }
  }
}

export class LineChartSettings{

  selectedAsset: Asset;
  showReturns: boolean;

  constructor(selectedAsset: Asset, showReturns: boolean){
    this.selectedAsset = selectedAsset;
    this.showReturns = showReturns;
  };

  isEqualTo(other: LineChartSettings){

    if(!this.selectedAsset.isEqualTo(other.selectedAsset)){
      return false;
    }
    if(this.showReturns != other.showReturns){
      return false;
    }
    return true;
  }
}
