"use strict";


const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// 관리자
router.get("/", ctrl.output.index);
router.get("/welfare_status", ctrl.output.welfare_status);
router.get("/news", ctrl.output.news);
router.get("/work_info", ctrl.output.work_info);
router.get("/free", ctrl.output.free);

module.exports = router;