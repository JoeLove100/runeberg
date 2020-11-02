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