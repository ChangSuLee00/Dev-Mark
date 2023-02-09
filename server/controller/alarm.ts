import { RequestHandler } from "express";
import { sequelize } from "../models/index.js";
import Alarm from "../models/alarm.js";
import { Op, QueryTypes } from "sequelize";

const createAlarm: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const newAlarm = await Alarm.create({
      alarmName: req.body.alarmName,
      time: req.body.date,
      UserId: UserId,
    });
    res.status(201).end();
    // 생성 성공 Status 201
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const renderAlarm: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const renderAlarm = await Alarm.findAll({
      where: { UserId },
    });
    if (!renderAlarm) {
      return res.end();
    } else {
      res.status(200);
      res.json(renderAlarm);
      // 아이템 가져오기 성공 Status 200
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteAlarm: RequestHandler = async (req, res, next) => {
  try {
    const d_id = req.body.id;
    const deleteAlarm = await Alarm.destroy({ where: { id: d_id } });
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.status(200).end();
  // 삭제 성공 status 200
};

const notifyAlarm: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const query = `SELECT * FROM alarms WHERE UserId = ${UserId} AND time <= now()`;
    const nofityAlarm = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      raw: true,
    });
    if (!nofityAlarm) {
      return res.end();
    } else {
      res.status(200);
      res.json(nofityAlarm);
      // 아이템 가져오기 성공 Status 200
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { createAlarm, renderAlarm, deleteAlarm, notifyAlarm };
