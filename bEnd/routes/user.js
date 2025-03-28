import express,{Router} from 'express';
import db from "../config/db.js";

const userRoute=express.Router();

userRoute.get('/users',async(req,res)=>{
    const q = "SELECT * FROM users";

    try {  
        const[data]=await db.query(q);
        return res.json(data);
    } catch (err) {
        res.status(500).json({ error: '데이터베이스 오류가 발생했습니다.' });
        return res.json(error);
    }
});

userRoute.post("/users", (req, res) => {
    const q = "INSERT into users (username, nickname, userId, password, email) values (?)";
    const values = [req.body.username, req.body.nickname, req.body.userId, req.body.password, req.body.email];
    console.log(values);
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// app.post("/userSignup", (req, res) => {
//     const q = "insert into users (name, nickname, userId, password, email) values (?)";
//     const values = [req.body.name, req.body.nickname, req.body.userId, req.body.password, req.body.email];
  
//     db.query(q, [values], (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });

export default userRoute;

//임포트 시킬것