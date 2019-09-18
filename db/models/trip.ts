/**
 * travel
 * trip.ts
 * Created by Saim ÇAY on 17.09.2019
 */

import mongoose from "mongoose";
import {ONE_KM, tripDTOPattern} from "../../constants/app";
import {Coordinate, Trip} from "../../types";
import {objectToDTO} from "../../utils/helpers";
import db from "../index";
import TripSchema from "../schemas/trip";

type Model = mongoose.Model<mongoose.Document, {}>;
type Document = mongoose.Document;

const TripModel: Model = db.model("trip", TripSchema);

function save(trip) {
    const newTrip: Document = new TripModel(trip);
    return newTrip.save()
        .then((savedTrip) => {
            return savedTrip._id.toString();
        })
        .catch(() => {
            return null;
        });
}

function getAll() {
    return TripModel.find()
        .then((trips) => {
            return trips.map((trip) => objectToDTO(trip.toObject() as Trip,
                tripDTOPattern, {_id: {key: "id", apply: "toString"}}));
        })
        .catch(() => {
            return null;
        });
}

function get(id: string) {
    return TripModel.findById(id)
        .then((trip) => {
            return objectToDTO(trip.toObject() as Trip,
                tripDTOPattern, {_id: {key: "id", apply: "toString"}});
        })
        .catch(() => {
            return null;
        });
}

function update(newTrip, id) {
    return TripModel.findByIdAndUpdate(id, newTrip)
        .then(() => true)
        .catch(() => false);
}

function nearBy(center: Coordinate, radius: number, startDate?: string, endDate?: string) {
    const queryConditions = {
        startPoint: {
            $near: {
                $maxDistance: radius * ONE_KM,
                $geometry: {
                    type: "Point",
                    coordinates: [center.lat, center.long]
                }
            }
        }
    };

    if (startDate && endDate) {
        queryConditions["date"] = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }

    return TripModel.find(queryConditions)
        .then((trips) => {
            return trips.map((trip) => objectToDTO(trip.toObject() as Trip,
                tripDTOPattern, {_id: {key: "id", apply: "toString"}}));
        })
        .catch((err) => {
            console.log("err", err);
            return null;
        });
}

export default {
    save,
    getAll,
    update,
    nearBy,
    get
};
