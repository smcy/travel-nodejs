/**
 * travel
 * types.d.ts
 * Created by Saim ÇAY on 17.09.2019
 */

export interface Coordinate {
    lat: number;
    long: number;
}

export interface Point {
    type: string;
    coordinates: number[];
}

export interface TripDTO {
    id?: string;
    startPoint: Point;
    endPoint: Point;
    date: Date;
    distance: number;
}

export interface Trip extends TripDTO {
    _id: string;
    __v: number;
}
