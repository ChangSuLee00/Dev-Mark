"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
/* Listen */
index_js_1.default.listen(index_js_1.default.get("port"), () => {
    console.log(`Listening on port ${index_js_1.default.get("port")}`);
});
