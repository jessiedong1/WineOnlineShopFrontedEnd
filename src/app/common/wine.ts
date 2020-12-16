import { Region } from './region';
import { Variety } from './variety';

export class Wine {
    id: number;
    title:string;
    description: string;
    price:number;
    point:number;
    taster_name:string;
    taster_twitter_handle:string;
    winery:string;
    imageUrl: string;
    active: boolean; 
    unitsInStock: number;
    dateCreated: Date;
    lastUpdated: Date;
    region: Region;
    variety: Variety;

}
