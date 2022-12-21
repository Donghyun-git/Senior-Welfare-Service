"use strict";

const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const encoder = bodyParser.urlencoded();
const mysql = require("mysql");
const session = require("express-session");
const MySqlStore = require("express-mysql-session")(session);

const dbData = fs.readFileSync('/Users/ddongs/Desktop/portfolio/SeniorWS/app/src/databases/user.json');
const conf = JSON.parse(dbData);

//라우팅
const home = require("./src/routes/home");

//json 파싱
    const free = require("/Users/ddongs/Desktop/portfolio/SeniorWS/app/src/public/json/freefood.json");
    const freeData = JSON.stringify(free);
    const data = JSON.parse(freeData);

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(cors());
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", home); // use -> 미들웨어 등록해주는 메소드.

//세션
app.use(session({
    secret              : 'ABCD1234ABAB!@',
    resave              : false,
    saveUninitialized   : true,
    store               : new MySqlStore({
        host: conf.host,
        user: conf.user,
        password: conf.password,
        port: conf.port,
        database: conf.database
        })
}));

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
    multipleStatements: true
});

connection.connect(function(error){
    if (error) throw error
    else console.log("connected");
});

//로그인
app.post('/login',encoder, async function(req, res){

    console.log(req.session);
    const id = req.body.id;
    const pw = req.body.password;

    connection.query("SELECT id, pw, name FROM user WHERE id = ? and pw = ?;", [id, pw], function(error, results, fields){
        if(error) throw error;
        if(results.length == 0){
            res.send(`<script>alert('로그인에 실패하였습니다! 사용자 정보를 다시 확인해주세요!');
            location.href='/login'</script>`);
        } else {
            if(results[0] !==undefined){
                req.session.name = results[0].name;
                req.session.isLogined = true;
                req.session.save(() => {
                    res.redirect('/success');
                });
        }
        }
    });
});

app.post('/signup', encoder, async function(req, res){
    const id = req.body.id;
    const pw = req.body.password;
    const name = req.body.name;
    const registNum = req.body.registNum;
    console.log(req.body);
            if (!id){
                res.send(`<script>alert('아이디를 입력해주세요!');
                location.href='/signup'</script>`);
             }

            else if(!pw){
                res.send(`<script>alert('비밀번호를 입력해주세요!');
                location.href='/signup'</script>`);
            }

            else if(!name) {
                res.send(`<script>alert('이름을 입력해주세요!');
                location.href='/signup'</script>`);
                
            }
            else if(!registNum) {
                res.send(`<script>alert('주민번호를 입력해주세요!');
                location.href='/signup'</script>`);
               
            }
            else {

    connection.query(`insert into user (id, pw, name, registNum) values ("${id}", "${pw}", "${name}", "${registNum}");`, function(error, results, fields){
        if (error) throw error         
            else {
                res.send(`<script>alert('회원가입이 완료되었습니다.');
                location.href='/login'</script>`);
            }
        res.end();
    });
};
});


app.get('/success', function(req, res){
    console.log(req.session.name);
    if(req.session.name){
        res.render("home/loginok", {
        name: req.session.name
    });
    }
    
})

//로그아웃
app.get("/logout", function(req, res) {
    let session = req.session;
    delete session.name, session.isLogined;
    req.session.save(() => {
        res.redirect('/');
    });
    console.log(session);
});


app.get('/popup0', function(req, res){
    res.render("home/popup", {
        name: data[0].name,
        adr: data[0].roadAdr,
        tel: data[0].tel,
        time: data[0].foodtime,
        day: data[0].day,
        who: data[0].who,
    });
});

app.get('/popup0', function(req, res){
    res.render("home/popup", {
        name: data[0].name,
        adr: data[0].roadAdr,
        tel: data[0].tel,
        time: data[0].foodtime,
        day: data[0].day,
        who: data[0].who,
    });
});

app.get('/popup1', function(req, res){
    res.render("home/popup", {
        name: data[1].name,
        adr: data[1].roadAdr,
        tel: data[1].tel,
        time: data[1].foodtime,
        day: data[1].day,
        who: data[1].who,
    });
});

app.get('/popup2', function(req, res){
    res.render("home/popup", {
        name: data[2].name,
        adr: data[2].roadAdr,
        tel: data[2].tel,
        time: data[2].foodtime,
        day: data[2].day,
        who: data[2].who,
    });
});

app.get('/popup3', function(req, res){
    res.render("home/popup", {
        name: data[3].name,
        adr: data[3].roadAdr,
        tel: data[3].tel,
        time: data[3].foodtime,
        day: data[3].day,
        who: data[3].who,
    });
});

app.get('/popup4', function(req, res){
    res.render("home/popup", {
        name: data[4].name,
        adr: data[4].roadAdr,
        tel: data[4].tel,
        time: data[4].foodtime,
        day: data[4].day,
        who: data[4].who,
    });
});

app.get('/popup5', function(req, res){
    res.render("home/popup", {
        name: data[5].name,
        adr: data[5].roadAdr,
        tel: data[5].tel,
        time: data[5].foodtime,
        day: data[5].day,
        who: data[5].who,
    });
});


module.exports = app;
