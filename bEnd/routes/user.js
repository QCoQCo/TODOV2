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

export default userRoute;

//임포트 시킬것