import { LineChartCardComponent } from './line-chart-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Asset } from '../shared.market-data';
import { By } from '@angular/platform-browser';


describe("LineChartCardComponent", () => {

    let fixture: ComponentFixture<LineChartCardComponent>;

    beforeEach(() => {
        
        TestBed.configureTestingModule({
            declarations: [
                LineChartCardComponent
            ]
        });

        fixture = TestBed.createComponent(LineChartCardComponent);
        fixture.debugElement.componentInstance.asset = new Asset(1, "test_asset", "Test Asset");
    });

    it("should render the correct asset total return in the title", () => {
        // arrange
        spyOn(fixture.debugElement.componentInstance.asset, "getTotalReturn").and.returnValue(0.101);

        // act
        fixture.detectChanges();
        let result = fixture.debugElement.query(By.css("#lineChartHeader")).nativeElement.textContent.trim();

        // assert
        expect(result).toBe("Test Asset (10.1%)")
    })
})