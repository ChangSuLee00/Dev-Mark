"use strict";
exports.__esModule = true;
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
var config_1 = require("../config/config");
/* Env type annotation */
var env = process.env.NODE_ENV ||
    "development";
/* DB connect information */
var _a = config_1["default"][env], database = _a.database, username = _a.username, password = _a.password;
var sequelize = new sequelize_1.Sequelize(database, username, password, config_1["default"][env]);
exports.sequelize = sequelize;
exports["default"] = sequelize;
