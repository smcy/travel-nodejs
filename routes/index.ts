/**
 * travel
 * index.ts
 * Created by Saim ÇAY on 17.09.2019
 */

import express from "express";
import {api} from "../config/app.json";
import {trip} from "./controllers";

const router: express.Router = express.Router();

router.use(api.path + "/trip", trip);

export default router;
