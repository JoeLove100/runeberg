import { Asset, DataPoint } from "./shared.market-data"


describe("Shared market data", () => {
    describe("Asset", () => {
        
        let testAsset: Asset

        beforeEach(() => {
            const data = [new DataPoint(new Date(2020, 1, 31), 20), 
                new DataPoint(new Date(2020, 2, 15), 25)];
            testAsset = new Asset(1, "test_asset", "Test Asset", data);
        })

        it("should be equal to another asset when all attributes are equal", () => {
            // arrange
            let otherAsset = testAsset;

            // act
            let result = otherAsset.isEqualTo(testAsset);

            // arrange
            expect(result).toBeTrue();
        });

        it("should not be equal to another asset with a different id", () => {
            // arrange
            let otherAsset = new Asset(2, "test_asset", "Test Asset");

            // act
            let result = otherAsset.isEqualTo(testAsset);

            // assert
            expect(result).toBeFalse();
        });

        it("should not be equal to another asset with a different name", () => {
            // arrange
            let otherAsset = new Asset(1, "other_asset", "Test Asset");

            // act
            let result = otherAsset.isEqualTo(testAsset);

            // assert
            expect(result).toBeFalse();
        });

        it("should not be equal to another asset with a different display name", () => {
            // arrange
            let otherAsset = new Asset(1, "test_asset", "Other Asset");

            // act
            let result = otherAsset.isEqualTo(testAsset);

            // assert
            expect(result).toBeFalse();
        });

        it("should not be equal to another asset which has different data", () => {
            // arrange
            let otherData = [new DataPoint(new Date(2020, 1, 31), 19), new DataPoint(new Date(2020, 2, 14), 25)];
            let otherAsset = new Asset(1, "test_asset", "Other Asset", otherData);

            // act
            let result = otherAsset.isEqualTo(testAsset);

            // assert
            expect(result).toBeFalse();
        });

        it("should return the return from first to last data point on getTotalReturn", () => {
            // arrange/act
            let result = testAsset.getTotalReturn();

            // assert
            expect(result).toBeCloseTo(0.25);
        });
        
    });

    describe("DataPoint", () => {

        let testPoint: DataPoint;

        beforeEach(() => {
            testPoint = new DataPoint(new Date(2020, 5, 31), 100.5);
        })

        it("should be equal to another data point if all attributes are equal", () => {
            // arrange
            let otherPoint = testPoint;

            // act
            let result = otherPoint.isEqual(testPoint);

            // assert
            expect(result).toBeTrue();
        });

        it("should not equal another point if the other point has a different date", () => {
            // arrange
            let otherPoint = new DataPoint(new Date(2020, 5, 15), 100.5);

            // act
            let result = otherPoint.isEqual(testPoint);

            // assert
            expect(result).toBeFalse();
        });

        it("should not equal another point if the other point has a different value", () => {
            // arrange
            let otherPoint = new DataPoint(new Date(2020, 5, 31), 9.5);

            // act
            let result = otherPoint.isEqual(testPoint);

            // assert
            expect(result).toBeFalse();
        });
    });
})