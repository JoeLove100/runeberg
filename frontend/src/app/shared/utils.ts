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

export class DateHelper{

    static getPrevMonthEnd(date: Date): Date{
        return new Date(date.getFullYear(), date.getMonth(), 0);
    }

    static getPrevQuarterEnd(date: Date): Date{
        return new Date(date.getFullYear(), Math.floor(date.getMonth() / 3) * 3, 0);
    }

    static getPrevYearEnd(date: Date): Date{
        return new Date(date.getFullYear(), 0, 0);
    }

    static getNMonthsBeforeToday(n: number): Date{
        let today = new Date();
        return new Date(today.getFullYear(), today.getMonth() - n, 0);
    }

    static getNDaysBeforeToday(n: number): Date{
        let today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() - n)
    }

    static getAsString(date: Date){
        let day = "" + date.getDate();
        let month = "" + (1 + date.getMonth());
        let year = "" + date.getFullYear();

        if (month.length < 2){
            month = "0" + month;
        }
        if (day.length < 2){
            day = "0" + day;
        }

        return [year, month, day].join("-");
    }
}