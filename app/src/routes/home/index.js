"use strict";
const express = require("express");
const router = express.Router();


const ctrl = require("./home.ctrl");

// 렌더링
router.get("/", ctrl.output.index);
router.get("/welfare_status", ctrl.output.welfare_status);
router.get("/news", ctrl.output.news);
router.get("/free", ctrl.output.free);
router.get("/popup", ctrl.output.popup);
router.get("/login",ctrl.output.login);
router.get("/signup", ctrl.output.signup);
router.get("/loginok", ctrl.output.loginok);


module.exports = router;