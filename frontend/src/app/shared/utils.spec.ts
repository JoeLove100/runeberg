import { binarySearch } from './utils'


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
}) 