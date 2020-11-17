export class Asset{
id: number;
name: string;
displayName: string;
data: DataPoint[];

constructor(id: number, 
    name: string,
    displayName: string,
    data: DataPoint[] = []){
        this.id = id;
        this.name = name;
        this.displayName = displayName;
        this.data = data;
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
    if(this.data.length != other.data.length){
        return false
    }
    
    for(let i = 0; i < this.data.length; i ++){
        if (!this.data[i].isEqual(other.data[i])){
            return false;
        }
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

isEqual(other: DataPoint){
    if(this.date != other.date){
        return false;
    }
    if(this.value != this.value){
        return false;
    }
    return true;
}
}