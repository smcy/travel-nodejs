/**
 * travel
 * index.ts
 * Created by Saim ÇAY on 17.09.2019
 */

import mongoose from "mongoose";
import {database} from "../config/app.json";

const dbName: string = database.name[process.env.mode];
mongoose.connect(database.path[process.env.mode] + dbName, database.options);

export default mongoose;
