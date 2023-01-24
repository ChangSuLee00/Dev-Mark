"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
exports.api = express_1.default.Router();
/* Import route */
const info_js_1 = require("./info.js");
const user_js_1 = require("./user.js");
const box_js_1 = require("./box.js");
exports.api.use("/info", info_js_1.info);
exports.api.use("/user", user_js_1.user);
exports.api.use("/box", box_js_1.box);
