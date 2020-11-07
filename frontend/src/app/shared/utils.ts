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