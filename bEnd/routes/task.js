import express,{Router} from 'express';
import db from "../config/db.js";

const taskRoute=express.Router();

// taskRoute.get('/tasks',async(req,res)=>{
//     const q = "SELECT * FROM tasks";

//     try {  
//         const[data]=await db.query(q);
//         return res.json(data);
//     } catch (err) {
//         res.status(500).json({ error: '데이터베이스 오류가 발생했습니다.' });
//         return res.json(error);
//     }
// });
taskRoute.get("/userTask", async (req,res)=>{
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
});

taskRoute.get("/tasks", async (req,res)=>{
    const q="SELECT * FROM tasks WHERE id = ?";
    const id=req.query.id;

    if (!id) {
        return res.status(400).json({ error: '검색어를 입력해주세요.' });
    }

    try {
        const connection=await db.getConnection();
        const[r]=await connection.execute(q,[`${id}`]);
        connection.release();
        res.json(r);
    } catch (error) {
        console.error('데이터베이스 쿼리 오류:', error);
        console.error(error.stack); // 스택 트레이스 로깅 추가
        res.status(500).json({ error: '데이터베이스 오류가 발생했습니다.' });
    }
});

taskRoute.post("/tasks", (req, res) => {
    const q = "INSERT into tasks (subject, memo, userId) values (?)";
    const values = [req.body.subject, req.body.memo, req.body.userId];
    // console.log(values);
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json({ message: "작업이 완료되었습니다." });
    });
});

taskRoute.delete("/tasks",(req,res)=>{
    // console.log(req.body.id);
    const q="DELETE FROM tasks WHERE id = ?;"
    const v=req.body.id;
    db.query(q,v,(err,data)=>{
        if(err)return res.json(err);
        return res.json({ message: "작업이 완료되었습니다." });
    });
});

taskRoute.put("/tasks", (req, res) => {
    const q = "UPDATE tasks SET subject = ?, memo = ? WHERE Id = ?";
    const {subject,memo,id}=req.body;
    // console.log(values);
    try {
        db.query(q, [subject,memo,id], (err, data) => {
        if (err) return res.json(err);
        return res.json({ message: "작업이 완료되었습니다." });
        });
    } catch (error) {
        console.error(err);
        return res.status(500).json({ error: "작업 수정에 실패했습니다." });
    }
});
taskRoute.put("/doneTask", (req, res) => {
    const q = "UPDATE tasks SET done = ? WHERE Id = ?";
    const {done,id}=req.body;
    // console.log(values);
    try {
        db.query(q, [done,id], (err, data) => {
        if (err) return res.json(err);
        return res.json({ message: "작업이 완료되었습니다." });
        });
    } catch (error) {
        console.error(err);
        return res.status(500).json({ error: "작업 수정에 실패했습니다." });
    }
});
export default taskRoute;

//임포트 시킬것