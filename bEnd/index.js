import express from "express";
import cors from 'cors';
import db from "./config/db.js";
// const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
// const db = require('./config/db.js');

app.use(express.json());
app.use(cors());



// app.post("/tasks",(req,res)=>{
//     const q ="in"
// });
//SELECT * FROM tasks WHERE userId=(?)

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});

db.connect((err)=>{
    if(err){
        console.error('Database connection failed: '+err.stack);
        return;
    }
    console.log('Connected to Database.');
});

app.get("/",(req,res)=>{
    res.json("welcome to BACKEND.");
});

app.get("/users", (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err,data) => {
        if(err)return res.json(err);
        return res.json(data);
    });
});

app.get("/tasks", (req, res) => {
    const q = "SELECT * FROM tasks";
    db.query(q, (err,data) => {
        if(err)return res.json(err);
        return res.json(data);
    });
});
app.get("/userTask")
//추가
app.post("/userSignup", (req, res) => {
    const q = "insert into users (name, nickname, userId, password, email) values (?)";
    const values = [req.body.name, req.body.nickname, req.body.userId, req.body.password, req.body.email];
  
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
// app.get("/", (req, res) => {
//     const sqlQuery = "INSERT INTO requested (rowno) VALUES (1)";
//     db.query(sqlQuery, (err, result) => {
//         console.log(err);
//         res.send("success!");
//     });
// });

// db.connect(function(err) {
//     if (err) {
//       throw err; // 접속에 실패하면 에러를 throw 합니다.
//     } else {
//       // 접속시 쿼리를 보냅니다.
//       db.query("SELECT * FROM users", function(err, rows, fields) {
//         console.log(rows); // 결과를 출력합니다!
//       });
//     }
// });

