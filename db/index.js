"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_json_1 = require("../config/app.json");
const dbName = app_json_1.database.name[process.env.mode];
mongoose_1.default.connect(app_json_1.database.path[process.env.mode] + dbName, app_json_1.database.options);
exports.default = mongoose_1.default;
