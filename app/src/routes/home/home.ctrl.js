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
    free: (req, res) => {
        res.render("home/free");
    },
    popup: (req, res) => {
        res.render("home/popup");
    },
    login: (req, res) => {
        res.render("home/login");
    },
    signup: (req, res) => {
        res.render("home/signup");
    },
    loginok: (req, res) => {
        res.render("home/loginok");
    }
};



module.exports = {
    output,

};



