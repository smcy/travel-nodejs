/**
 * travel
 * testData.ts
 * Created by Saim ÇAY on 18.09.2019
 */

import {TripDTO} from "../types";

export const testData: TripDTO[] = [
    {
        startPoint: {
            type: "Point",
            coordinates: [
                39.906239,
                32.859201
            ]
        },
        endPoint: {
            type: "Point",
            coordinates: [
                39.901239,
                32.707922
            ]
        },
        distance: 22,
        date: new Date("Tue Sep 10 2019 22:46:52 GMT+0300")
    },
    {
        startPoint: {
            type: "Point",
            coordinates: [
                39.913211,
                32.854553
            ]
        },
        endPoint: {
            type: "Point",
            coordinates: [
                39.886880,
                32.854963
            ]
        },
        distance: 4.3,
        date: new Date("Tue Sep 10 2019 10:16:09 GMT+0300")
    },
    {
        startPoint: {
            type: "Point",
            coordinates: [
                39.901707,
                32.859540
            ]
        },
        endPoint: {
            type: "Point",
            coordinates: [
                39.908562,
                32.776430
            ]
        },
        distance: 11.5,
        date: new Date("Sun Sep 8 2019 12:01:09 GMT+0300")
    },
    {
        startPoint: {
            type: "Point",
            coordinates: [
                39.944389,
                32.843953
            ]
        },
        endPoint: {
            type: "Point",
            coordinates: [
                39.933250,
                32.837800
            ]
        },
        distance: 2,
        date: new Date("Sun Sep 8 2019 16:24:24 GMT+0300")
    }
];
