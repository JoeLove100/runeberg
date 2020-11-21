import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MarketDataService } from 'src/app/services/market-data.service';
import { Asset } from 'src/app/shared/shared.market-data';
import { DataViewerMenuComponent } from "./data-viewer-menu.component"


describe("Data viewer menu component", () =>{
    
    let fixture: ComponentFixture<DataViewerMenuComponent>;
    let mockMarketDataService: any;
    let ASSETS = [
        new Asset(1, "test_asset_1", "Test Asset 1"),
        new Asset(2, "test_asset_2", "Test Asset 2"),
        new Asset(3, "test_asset_3", "Test Asset 3")
    ]

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                DataViewerMenuComponent
            ],
            providers: [{
                provide: MarketDataService,
                useValue: jasmine.createSpyObj("MarketDataService", [], {"allAssets$": of(ASSETS)})
            }]            
        });

        mockMarketDataService = TestBed.inject(MarketDataService);
        // mockMarketDataService.allAssets$ = of(ASSETS);
        fixture = TestBed.createComponent(DataViewerMenuComponent);
    })

    it("should initialise the combo box with the first asset from the market data service", () => {
        // arrange/act
        fixture.detectChanges();

        // assert
        const comboBox = fixture.componentInstance.assetSelectFormControl;
        const expectedValue = new Asset(1, "test_asset_1", "Test Asset 1");
        expect(expectedValue.isEqualTo(comboBox.value as Asset)).toBeTrue();
    });

    it("should add all assets from the market data service as combo box items", () => {
        // arrange/act
        fixture.detectChanges();

        // assert
        let options = fixture.debugElement.queryAll(By.css("option"))
        expect(options.length).toBe(3);
    });

    it("should intitialise show returns to be false", () => {
        // arrange/act
        fixture.detectChanges();

        // assert
        const checkBox = fixture.componentInstance.showReturnsCheckoxControl;
        expect(checkBox.value).toBeFalsy();
    });

    it("should emit change event when settings changed method is called", () => {
        // arrange
        spyOn(fixture.componentInstance.settingsChanged, "emit");

        // act
        fixture.componentInstance.onSettingsChangedEvent();

        // assert
        expect(fixture.componentInstance.settingsChanged.emit).toHaveBeenCalled();
    });
})