import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DateSliderComponent } from './date-slider.component'

describe("Date slider component", () => {
    let dateSliderFixture: ComponentFixture<DateSliderComponent>;

    beforeEach(() => {
        
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [DateSliderComponent]
        });

        dateSliderFixture = TestBed.createComponent(DateSliderComponent)
    });

    describe("Format date", () => {

        it("should format a date object as a string 'YYYY-MM-DD'", () =>{
            // arrange
            let date = new Date("2020-03-15");

            // act
            let result = dateSliderFixture.componentInstance.formatForInput(date);

            // assert
            expect(result).toEqual("2020-03-15")
        });
    });

    describe("Get selected dates", () => {

        it("should return the correct high and low dates for the slider values", () => {
            // arrange
            let dates = [new Date("2020-01-31"), new Date("2020-02-10"), new Date("2020-02-15"), new Date("2020-03-05")];
            dateSliderFixture.componentInstance.allDates = dates;
            dateSliderFixture.componentInstance.value = 0;
            dateSliderFixture.componentInstance.highValue = 2;

            // act
            let result = dateSliderFixture.componentInstance.getSelectedDates();

            // assert
            expect(result).toEqual([new Date("2020-01-31"), new Date("2020-02-15")]);
        });
    });

    describe("Set selected dates", () => {

        it("should set inputs to show the correct values", () => {
            // arrange
            let dates = [new Date("2020-01-31"), new Date("2020-02-10"), new Date("2020-02-15"), new Date("2020-03-05")];
            dateSliderFixture.componentInstance.allDates = dates; 
            dateSliderFixture.detectChanges();

            // act
            dateSliderFixture.componentInstance.value = 1;
            dateSliderFixture.componentInstance.highValue = 2;
            dateSliderFixture.componentInstance.setSelectedDates();
            dateSliderFixture.detectChanges();

            // assert
            const dateInputLow = dateSliderFixture.debugElement.queryAll(By.css("input"))[0].nativeElement;
            const dateInputHigh = dateSliderFixture.debugElement.queryAll(By.css("input"))[1].nativeElement;
            expect(dateInputLow.value).toEqual("2020-02-10")
            expect(dateInputHigh.value).toEqual("2020-02-15")
        });

        it("should update the min/max values to prevent overlap", () => {
            // arrange
            let dates = [new Date("2020-01-31"), new Date("2020-02-10"), new Date("2020-02-15"), new Date("2020-03-05")];
            dateSliderFixture.componentInstance.allDates = dates; 
            dateSliderFixture.detectChanges();

            // act
            dateSliderFixture.componentInstance.value = 1;
            dateSliderFixture.componentInstance.highValue = 2;
            dateSliderFixture.componentInstance.setSelectedDates();
            dateSliderFixture.detectChanges();

            // assert
            const dateInputLow = dateSliderFixture.debugElement.queryAll(By.css("input"))[0].nativeElement;
            const dateInputHigh = dateSliderFixture.debugElement.queryAll(By.css("input"))[1].nativeElement;
            expect(dateInputLow.max).toEqual("2020-02-15")
            expect(dateInputHigh.min).toEqual("2020-02-10")
        })
    })
    
})