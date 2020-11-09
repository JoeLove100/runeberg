import { DataPoint } from './shared.market-data';

function _binarySearch(arr: number[] | Date[], 
    target: number | Date, 
    lo: number,
    hi: number): number {
        
        if (hi == lo){
            return lo;
        }

        let guess = Math.ceil((hi + lo) / 2);
        if (arr[guess] == target){
            return guess;
        }
        else if (arr[guess] > target){
            return _binarySearch(arr, target, lo, guess - 1);
        }
        else{
            return _binarySearch(arr, target, guess, hi);
        }
    }   


export function binarySearch(arr: number[] | Date[],
    target: number | Date){
        return _binarySearch(arr, target, 0, arr.length - 1);
    }

export function priceToReturns(prices: DataPoint[]): DataPoint[] {

    let returns = [];
    if(prices.length == 1){
        return [];
    }
    else{
        for(let i = 1; i < prices.length; i++){
            let periodReturn = prices[i].value / prices[i - 1].value - 1;
            returns.push(new DataPoint(prices[i].date, periodReturn));
        }
        return returns;
    };
}

export function priceToCumulativeReturns(prices: DataPoint[]): DataPoint[] {
    
    let returns = [];
    if(prices.length == 1){
        return [];
    }
    else{
        for(let i = 1; i < prices.length; i++){
            let periodReturn = prices[i].value / prices[0].value - 1;
            returns.push(new DataPoint(prices[i].date, periodReturn));
        }
        return returns;
    };

}