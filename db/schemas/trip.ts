/**
 * travel
 * trip.ts
 * Created by Saim ÇAY on 17.09.2019
 */

import mongoose from "mongoose";

const TripSchema: mongoose.Schema = new mongoose.Schema({
    startPoint: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    endPoint: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
    distance: Number,
    date: {
        type: Date,
        required: true
    }
});
TripSchema.index({startPoint: "2dsphere"});

export default TripSchema;
