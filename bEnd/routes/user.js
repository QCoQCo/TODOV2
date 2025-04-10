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
        return res.json(err);
    }
});

userRoute.post("/users", (req, res) => {
    const q = "INSERT into users (username, nickname, userId, password, email) values (?)";
    const values = [req.body.username, req.body.nickname, req.body.userId, req.body.password, req.body.email];
    // console.log(values);
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json({ message: "작업이 완료되었습니다." });
    });
});

userRoute.delete("/users",(req,res)=>{
    // console.log(req.body.id);
    const q="DELETE FROM users WHERE id = ?;"
    const v=req.body.id;
    db.query(q,v,(err,data)=>{
        if(err)return res.json(err);
        return res.json({ message: "작업이 완료되었습니다." });
    });
});

userRoute.put("/users", (req, res) => {
    const q = "UPDATE users SET username = ?, nickname = ?, password = ?, email = ? WHERE userId = ?";
    const {username,nickname,password,email,userId}=req.body;
    // console.log(values);
    try {
        db.query(q, [username,nickname,password,email,userId], (err, data) => {
        if (err) return res.json(err);
        return res.json({ message: "작업이 완료되었습니다." });
        });
    } catch (error) {
        console.error(err);
        return res.status(500).json({ error: "작업 수정에 실패했습니다." });
    }

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