/**
 * travel
 * trip.spec.ts
 * Created by Saim ÇAY on 18.09.2019
 */

import chai from "chai";

import db from "../";
import {testData} from "../../constants/testData";
import {Coordinate, TripDTO} from "../../types";
import {sortByDistance} from "../../utils/helpers";
import TripModel from "./trip";

const expect = chai.expect;

const [testData1, testData2, testData3] = testData;

before(() => {
    const savePromises = [TripModel.save(testData2), TripModel.save(testData3)];
    return Promise.all(savePromises)
        .then((ids: string[]) => {
            if (ids[0] && ids[1]) {
                testData2.id = ids[0];
                testData3.id = ids[1];
            } else {
                throw new Error("Data could not saved");
            }
        })
        .catch((error) => {
            console.error(error.message);
        });

});

describe("Trip model test:", () => {

    it("It should return id. If the process is not success, it returns null.", (done) => {
        TripModel.save(testData1).then((id: string) => {
            expect(id).to.not.equal(null);
            expect(id).to.be.a("string");
            testData1.id = id;
            done();
        }).catch((error) => {
            console.error(error.message);
        });
    });

    it("It should return trip data with related id. If the process is not success, it returns null.", (done) => {
        TripModel.get(testData1.id).then((trip: TripDTO) => {
            expect(trip).to.deep.equal(testData1);
            done();
        }).catch((error) => {
            console.error(error.message);
        });
    });

    it("It should return true value. If the process is not success, it returns false value.", (done) => {
        testData1.distance = 19.5; // update data

        TripModel.update(testData1, testData1.id).then((result: boolean) => {
            expect(result).to.be.a("boolean");
            expect(result).to.equal(true);
            done();
        }).catch((error) => {
            console.error(error.message);
        });
    });

    it("It should return all trips data as an array.", (done) => {
        TripModel.getAll().then((trips: TripDTO[]) => {
            expect(trips).to.be.an("array");
            expect(trips.sort(sortByDistance)).to.deep.equal([testData1, testData2, testData3].sort(sortByDistance));
            done();
        }).catch((error) => {
            console.error(error);
        });
    });

    it("It should return all trips data nearby of given location and radius as an array.", (done) => {
        const startPoint: Coordinate = {
            lat: testData1.startPoint.coordinates[0],
            long: testData1.startPoint.coordinates[1]
        };
        TripModel.nearBy(startPoint, 0.830).then((trips: TripDTO[]) => {
            expect(trips).to.be.an("array");
            expect(trips).to.deep.equal([testData1, testData3]);
            done();
        }).catch((error) => {
            console.error(error);
        });
    });
});

after(() => {
    db.connection.db.dropDatabase();
});
