/**
 * travel
 * trip.ts
 * Created by Saim ÇAY on 17.09.2019
 */

import express from "express";
import Cache from "../../cache";
import {cache} from "../../config/app.json";
import {status} from "../../constants/app";
import TripModel from "../../db/models/trip";
import {Coordinate, TripDTO} from "../../types";

const router: express.Router = express.Router();

const tripCache = new Cache(cache.ttl);

router.post("/", (req: express.Request, res: express.Response) => {
    const newTrip = req.body;

    if (newTrip) {
        newTrip.date = typeof newTrip.date === "string" ? new Date(newTrip.date) : new Date();
        return TripModel.save(newTrip)
            .then((id) => {
                if (id) {
                    tripCache.flush();
                    return res.status(status.CREATED).send(id);
                } else {
                    return res.sendStatus(status.BAD_REQUEST);
                }
            });
    }

    return res.sendStatus(status.BAD_REQUEST);
});

router.get("/", (req: express.Request, res: express.Response) => {
    const id = req.query.id;

    if (id && typeof id === "string") {
        return tripCache.get("trip_" + id, () => TripModel.get(id))
            .then((trip: TripDTO) => {
                if (trip) {
                    return res.status(status.OK).send(trip);
                } else {
                    return res.sendStatus(status.NOT_FOUND);
                }
            });
    }

    return res.sendStatus(status.BAD_REQUEST);
});

router.patch("/:id", (req: express.Request, res: express.Response) => {
    const newTrip = req.body;
    const id: string = req.params.id;

    if (newTrip) {
        newTrip.date = typeof newTrip.date === "string" ? new Date(newTrip.date) : new Date();
        return TripModel.update(newTrip, id).then((result) => {
            if (result) {
                tripCache.flush();
                return res.sendStatus(status.OK);
            } else {
                return res.sendStatus(status.BAD_REQUEST);
            }
        });
    }

    return res.sendStatus(status.BAD_REQUEST);
});

router.get("/all", (req: express.Request, res: express.Response) => {
    return tripCache.get("allTrips", TripModel.getAll)
        .then((trips) => {
            if (trips) {
                return res.status(status.OK).send(trips);
            } else {
                return res.sendStatus(status.BAD_REQUEST);
            }
        });
});

router.get("/nearby", (req: express.Request, res: express.Response) => {
    const query = req.query as { [key: string]: string }
    const location = query.location;
    const radius = parseFloat(query.radius) || 1;
    const startDate = query.startDate;
    const endDate = query.endDate;

    if (location) {
        const locationComponents: string[] = location.split(",");
        const center: Coordinate = {
            lat: parseFloat(locationComponents[0]),
            long: parseFloat(locationComponents[1])
        };

        return tripCache.get(req.url, () => TripModel.nearBy(center, radius, startDate, endDate))
            .then((trips) => {
                if (trips) {
                    return res.status(status.OK).send(trips);
                } else {
                    return res.sendStatus(status.BAD_REQUEST);
                }
            });
    }

    return res.sendStatus(status.BAD_REQUEST);
});

export default router;
