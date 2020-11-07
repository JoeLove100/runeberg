function _binarySearch(arr: number[] | Date[], 
    target: number | Date, 
    lo: number,
    hi: number): number {
        
        if (hi == lo){
            return lo;
        }

        let guess = Math.floor((hi - lo) / 2);
        if (arr[guess] == target){
            return guess;
        }
        else if (arr[guess] > target){
            return _binarySearch(arr, target, lo, guess);
        }
        else{
            return _binarySearch(arr, target, guess + 1, lo);
        }
    }   


export function binarySearch(arr: number[] | Date[],
    target: number | Date){
        return _binarySearch(arr, target, 0, arr.length);
    }