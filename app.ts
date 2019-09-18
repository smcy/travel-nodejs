/**
 * travel
 * app.ts
 * Created by Saim ÇAY on 17.09.2019
 */

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {server} from "./config/app.json";
import {errorLogger, logger} from "./middlewares";
import router from "./routes";

const app: express.Application = express();
const port: string = process.env.PORT || server.port;

if (process.env.mode === "development") {
    app.use(logger);
}

app.use(cors());
app.use(bodyParser.json());
app.use(router);

if (process.env.mode === "development") {
    app.use(errorLogger);
}

app.listen(port, (err) => {
    if (err) {
        console.error("Error", err);
    }
    console.log("Server is running on " + port);
});

export default app;
