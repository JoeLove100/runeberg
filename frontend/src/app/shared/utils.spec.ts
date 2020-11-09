import { DataPoint } from './shared.market-data';
import { binarySearch, priceToCumulativeReturns, priceToReturns } from './utils'


describe("Utility functions", ()=> {

    describe("Binary search", () => {

        let sortedArr = [1, 3, 8, 10, 11, 15];

        it("should return 0 if target is smaller than lowest number", () => {
            // arrange
            const target = -3;

            // act
            const result = binarySearch(sortedArr, target);

            // assert
            expect(result).toEqual(0);
        })

    it("should return length - 1 if target is larger than greatest number", () => {
        // arrange
        const target = 50;

        // act
        const result = binarySearch(sortedArr, target);

        // assert
        expect(result).toEqual(5);
    });

    it("should return the 0 if the target is the minimum element", () => {
        // arrange
        const target = 1;

        // act
        const result = binarySearch(sortedArr, target);

        // assert
        expect(result).toEqual(0)
    });

    it("should return length - if the target is the maximum element", () => {
        // arrange
        const target =  15;

        // act
        const result = binarySearch(sortedArr, target);

        // assert
        expect(result).toEqual(5);
    });

    it("should return the index of an element in the array if the target is that element", () => {
        // arrange
        const target = 8;

        // act
        const result = binarySearch(sortedArr, target);

        // assert
        expect(result).toEqual(2);
    });

    it(`should return the index of the largest element smaller than the target if the target 
    is not in the array`, () => {
        // arrange
        const target = 14;
        
        // act
        const result = binarySearch(sortedArr, target);

        // assert
        expect(result).toEqual(4);
    });

    });

    describe("Prices to return", () => {

        it("Should return an empty array for an input of length 1", () => {
            // arrange
            const arr = [new DataPoint(new Date(2020, 1, 31), 10)];

            // act
            const result = priceToReturns(arr);

            // assert
            expect(result.length).toBe(0);
        });

        it(`Should return an array defined on all dates in the input save the first`, () => {
            // arrange
            const arr = [
                new DataPoint(new Date(2020, 1, 31), 10),
                new DataPoint(new Date(2020, 2, 28), 12),
                new DataPoint(new Date(2020, 3, 31), 9)
            ];

            // act
            let result = priceToReturns(arr);
            let resultDates = result.map(dataPoint => dataPoint.date);

            // assert
            expect(resultDates).toEqual([new Date(2020, 2, 28), new Date(2020, 3, 31)]);
        });

        it(`Should calculate the % returns for inputs > length 1`, () => {
            // arrange
            const arr = [
                new DataPoint(new Date(2020, 1, 31), 10),
                new DataPoint(new Date(2020, 2, 28), 12),
                new DataPoint(new Date(2020, 3, 31), 9)
            ];
            
            // act
            let result = priceToReturns(arr);
            let resultValues = result.map(dataPoint => dataPoint.value);

            // assert
            expect(resultValues[0]).toBeCloseTo(0.2)
            expect(resultValues[1]).toBeCloseTo(-0.25)
        });
    })

    describe("Price to cumulative return", () => {

        it("should return % cumulative returns based on the input prices", () =>{
            // arrange
            const arr = [
                new DataPoint(new Date(2020, 1, 31), 10),
                new DataPoint(new Date(2020, 2, 28), 12),
                new DataPoint(new Date(2020, 3, 31), 9)
            ];

            // act
            let result = priceToCumulativeReturns(arr);
            let resultValues = result.map(dataPoint => dataPoint.value);

            // assert
            expect(resultValues[0]).toBeCloseTo(0.2);
            expect(resultValues[1]).toBeCloseTo(-0.1);
        })
    })
}) 