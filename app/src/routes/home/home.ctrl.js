"use strict";

const output = {
    index: (req, res) => {
        res.render("home/index");
    },
    welfare_status: (req, res) => {
        res.render("home/welfare_status");
    },
    news: (req, res) => {
        res.render("home/news");
    },
    work_info: (req, res) => {
        res.render("home/work_info");
    },
    free: (req, res) => {
        res.render("home/free");
    },
};




module.exports = {
    output
};



