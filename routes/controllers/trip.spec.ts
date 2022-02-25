/**
 * travel
 * trip.spec.ts
 * Created by Saim ÇAY on 18.09.2019
 */

import chai from "chai";
import chaiHttp from "chai-http";

import app from "../../app";
import {api} from "../../config/app.json";
import {status} from "../../constants/app";
import {testData} from "../../constants/testData";
import {TripDTO} from "../../types";
import {sortByDistance} from "../../utils/helpers";

const expect = chai.expect;
const [testData1, testData2, testData3, testData4] = testData;

chai.use(chaiHttp);

const apiPath = api.path + "/trip";

describe("Trip controller tests: ", () => {
    it("It should save a trip data and return it's id with response status 201.", (done: Mocha.Done) => {
        chai.request(app)
            .post(apiPath + "/")
            .send(testData4)
            .end((err: Error, res: ChaiHttp.Response) => {
                const id: string = res.text;
                expect(res.status).to.equal(status.CREATED);
                expect(id).to.be.a("string");
                testData4.id = id;
                done();
            });
    });
    it("It should get a trip data with related id and it returns response status 200.", (done: Mocha.Done) => {
        chai.request(app)
            .get(apiPath + "/?id=" + testData4.id)
            .end((err: Error, res: ChaiHttp.Response) => {
                expect(res.status).to.equal(status.OK);
                const trip: TripDTO = res.body;
                trip.date = new Date(trip.date);
                expect(trip).to.deep.equal(testData4);
                done();
            });
    });

    it("It should set new trips data with related id and it returns status 200.", (done: Mocha.Done) => {
        chai.request(app)
            .patch(apiPath + "/" + testData4.id)
            .send({...testData4, distance: 1.6})
            .end((err: Error, res: ChaiHttp.Response) => {
                expect(res.status).to.equal(status.OK);
                testData4.distance = 1.6;
                done();
            });
    });

    it("It should get all trips data as an array with status 200.", (done: Mocha.Done) => {
        chai.request(app)
            .get(apiPath + "/all")
            .end((err: Error, res: ChaiHttp.Response) => {
                expect(res.status).to.equal(status.OK);
                const trips: TripDTO[] = res.body;

                trips.map((trip) => {
                    trip.date = new Date(trip.date);
                });
                expect(trips.sort(sortByDistance)).to.deep
                    .equal([testData1, testData2, testData3, testData4].sort(sortByDistance));
                done();
            });
    });

    it("It should get all trips data nearby of given location and radius as an array with status 200.",
        (done: Mocha.Done) => {
            const location: string = "39.906239,32.859201";
            const radius: number = 0.833;
            chai.request(app)
                .get(apiPath + "/nearby?location=" + location + "&radius=" + radius)
                .end((err: Error, res: ChaiHttp.Response) => {
                    expect(res.status).to.equal(status.OK);
                    const trips: TripDTO[] = res.body;
                    trips.map((trip) => {
                        trip.date = new Date(trip.date);
                    });

                    expect(trips).to.deep.equal([testData1, testData3, testData2]);
                    done();
                });
        });
});
