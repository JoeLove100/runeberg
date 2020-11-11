export class Asset{
    id: number;
    name: string;
    displayName: string;

    constructor(id: number, 
        name: string,
        displayName: string){
            this.id = id;
            this.name = name;
            this.displayName = displayName;
        }

    isEqualTo(other: Asset): boolean{

        if(this.id != other.id){
            return false;
        }
        if(this.name != other.name){
            return false;
        }
        if(this.displayName != other.displayName){
            return false;
        }
        return true;
    }
}

export class Index{
    id: number;
    name: string;
    displayName: string;
    
    constructor(id: number,
        name: string,
        displayName: string){
            this.id = id;
            this.name = name;
            this.displayName = displayName;
        };
    
    isEqualTo(other: Index){
        
        if(this.id != other.id){
            return false;
        }
        if(this.name != other.name){
            return false;
        }
        if(this.displayName != other.displayName){
            return false;
        }
        return true;
    }
    
}


export class DataPoint{
    date: Date;
    value: number;

    constructor(date: Date,
        value: number){
            this.date = date;
            this.value = value;
        }
}