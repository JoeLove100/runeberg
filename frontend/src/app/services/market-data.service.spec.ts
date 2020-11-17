import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing';
import { Asset, DataPoint } from '../shared/shared.market-data';
import { MarketDataService } from './market-data.service';

describe("Market data service", () => {

    let httpTestingController: HttpTestingController;
    let marketDataService: MarketDataService;

    beforeEach(() => {


        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MarketDataService]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        marketDataService = TestBed.inject(MarketDataService);
    });

    describe("All assets", () => {

        it("should call http get with the correct url", () => {
            // arrange/act
            marketDataService.allAssets$.subscribe();

            // assert
            const req = httpTestingController.expectOne("http://localhost:8000/dataviewer/api/assets/");
            req.flush([])   
            httpTestingController.verify();
            expect(true).toBeTrue();  // hack - get rid of Jasmine warning about having no expectations
        });

        it("should map returned data to an array of asset objects", () =>{
            // arrange/act
            
            const ASSETS = 
            [
                {assetid: 1, assetname: "test_asset_1", assetdisplayname: "Test Asset 1"},
                {assetid: 2, assetname: "test_asset_2", assetdisplayname: "Test Asset 2"},
                {assetid: 3, assetname: "test_asset_3", assetdisplayname: "Test Asset 3"}
            ]

            const EXPECTED = 
            [
                new Asset(1, "test_asset_1", "Test Asset 1"),
                new Asset(2, "test_asset_2", "Test Asset 2"),
                new Asset(3, "test_asset_3", "Test Asset 3")
            ]
            marketDataService.allAssets$.subscribe(arr => {
                for(let i = 0; i < 3; i ++){
                    expect(arr[i]).toEqual(EXPECTED[i])
                };
            });

            // assert
            const req = httpTestingController.expectOne("http://localhost:8000/dataviewer/api/assets/");
            req.flush(ASSETS)
        });
    })

    describe("Get price series observable", () => {

        it("should call http get with the right url, id and start date", () => {
            // arrange/act
            let testAsset = new Asset(10, "test_asset", "Test Asset");
            let testStartDate = "2018-05-01"
            marketDataService.getAssetPriceSeriesObservable(testAsset, testStartDate).subscribe();
            
            // assert
            const req = httpTestingController.expectOne("http://localhost:8000/dataviewer/api/data/10/?datatype=price&start_date=2018-05-01");
            req.flush([])   
            httpTestingController.verify();
            expect(true).toBeTrue();  // hack - get rid of Jasmine warning about having no expectations
        });

        it("should return sorted list of data points", () => {
            // arrange/act
            let testAsset = new Asset(10, "test_asset", "Test Asset");
            let testStartDate = "2018-05-01"
            const DATA = 
            [
                {asofdate: "2020-01-31", datavalue: 50},
                {asofdate: "2019-08-15", datavalue: 35},
                {asofdate: "2020-02-10", datavalue: 20}
            ]
            const EXPECTED = 
            [
                new DataPoint(new Date("2019-08-15"), 35),
                new DataPoint(new Date("2020-01-31"), 50),
                new DataPoint(new Date("2020-02-10"), 20)
            ]
            marketDataService.getAssetPriceSeriesObservable(testAsset, testStartDate).subscribe(arr => {
                for(let i = 0; i < 3; i++){
                    expect(arr.data[i]).toEqual(EXPECTED[i]);
                }
            });

            // assert
            const req = httpTestingController.expectOne("http://localhost:8000/dataviewer/api/data/10/?datatype=price&start_date=2018-05-01");
            req.flush(DATA);
        })

    }) 
});