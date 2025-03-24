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

export default taskRoute;

//임포트 시킬것