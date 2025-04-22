import express,{Router} from 'express';
import db from "../config/db.js";

const logRoute=express.Router();

logRoute.post('/login',async(req,res)=>{
    const {id,pw}=req.body;
    const user=await db.query('SELECT * FROM users WHERE email=? AND password=?',[id,pw]);
    res.json(user);
});

logRoute.post('/googleLogin',async(req,res)=>{
    const {id}=req.body;
    const user=await db.query('SELECT * FROM users WHERE email=?',[id]);
    if(user.length>0){
        console.log('Login Success');
        res.json(user);
        console.log(user);
    }else{
        console.log('Login Failed');
        res.json([]);
    }
});




export default logRoute;