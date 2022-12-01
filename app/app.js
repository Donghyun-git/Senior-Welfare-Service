"use strict";

const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const mysql = require("mysql");

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", home); // use -> 미들웨어 등록해주는 메소드.

module.exports = app;
