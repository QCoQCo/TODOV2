import express from "express";
import cors from 'cors';
import db from "./config/db.js";
import userRoute from './routes/user.js'
import taskRoute from "./routes/task.js";
// const express = require('express');
const app = express();
const appRouter=express.Router();
const PORT = process.env.PORT || 4000;
// const db = require('./config/db.js');

app.use(express.json());
// appRouter.use(express.json());
app.use(cors());
// appRouter.use(cors());
app.use(userRoute);
app.use(taskRoute);


// app.post("/tasks",(req,res)=>{
//     const q ="in"
// });
//SELECT * FROM tasks WHERE userId=(?)


// db.connect((err)=>{
//     if(err){
//         console.error('Database connection failed: '+err.stack);
//         return;
//     }
//     console.log('Connected to Database.');
// });

app.get("/",(req,res)=>{
    res.json("welcome to BACKEND.");
});

// app.get("/users", async(req, res) => {
//     const q = "SELECT * FROM users";

//     try {
//         const[data]=await db.query(q);
//         return res.json(data);
//     } catch (error) {
//         // console.error(err);
//         res.status(500).json({ error: '데이터베이스 오류가 발생했습니다.' });
//         return res.json(error);
//     }

// });

// app.get("/tasks", (req, res) => {
//     const q = "SELECT * FROM tasks";
//     db.query(q, (err,data) => {
//         if(err)return res.json(err);
//         return res.json(data);
//     });
// });
appRouter.get("/userTask", async (req,res)=>{
    const q="SELECT * FROM tasks WHERE userId = ?";
    const userId=req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: '검색어를 입력해주세요.' });
    }

    try {
        const connection=await db.getConnection();
        const[r]=await connection.execute(q,[`${userId}`]);
        connection.release();
        res.json(r);
    } catch (error) {
        console.error('데이터베이스 쿼리 오류:', error);
        console.error(error.stack); // 스택 트레이스 로깅 추가
        res.status(500).json({ error: '데이터베이스 오류가 발생했습니다.' });
    }
    // const userId=req.query.userId;
    // if(userId){
    //     res.json(userId);
    // }else{
    //     res.status(400).send("userId파라미터가 필요합니다.");
    // }
    // db.query(q,v,(err,rows,fields)=>{
    //     if(err)return res.json(err);
    //     return res.json(rows);
    // })

});
app.use(appRouter);
//추가
app.post("/userSignup", (req, res) => {
    const q = "insert into users (name, nickname, userId, password, email) values (?)";
    const values = [req.body.name, req.body.nickname, req.body.userId, req.body.password, req.body.email];
  
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
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

