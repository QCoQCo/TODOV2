import express,{Router} from 'express';
import db from "../config/db.js";
import axios from 'axios';
// import jwt from 'jsonwebtoken';
import 'dotenv/config';


const logRoute=express.Router();

logRoute.post('/login',async(req,res)=>{
    const {id,pw}=req.body;
    const user=await db.query('SELECT * FROM users WHERE email=? AND password=?',[id,pw]);
    res.json(user);
});

logRoute.post('/googleLogin',async(req,res)=>{
    const {id}=req.body;
    // const authRes=await axios.post('https://oauth2.googleapis.com/token',{
    //     client_id:process.env.GOOGLE_CLIENT_ID,
    //     client_secret:process.env.GOOGLE_CLIENT_SECRET,
    //     code:authCode,
    //     redirect_uri:process.env.GOOGLE_REDIRECT_URI
    // });
    // console.log(authRes);
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

logRoute.post('/googleAuth',async(req,res)=>{
    const code=req.body.authCode;
    // const code= await axios.post('http://localhost:5173/account/logincomplete'
    console.log(code);
    const url=`https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=${process.env.GOOGLE_GRANT_TYPE}`;

    const access_Token=await axios
        .post(url,{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then((el)=>{
            return el.data.access_token;
        })
        .catch((err)=>console.log(err));
    console.log(access_Token?access_Token:'엑세스 토큰 발행 실패');
    // console.log(authCode);
    // res.json(authCode);
    if(access_Token){
        const googleAPI=`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_Token}`;
        const googleUser=await axios.get(googleAPI,{
            headers:{
                'Authorization':`Bearer ${access_Token}`
            }
        }).then((el)=>{
            return el.data;
        }).catch((err)=>console.log(err));
        const userEmail=googleUser.email;
        const userName=googleUser.name;
        console.log(userEmail,userName);
        const user=await db.query('SELECT * FROM users WHERE email=?',[userEmail]);
        if(user.length>0){
            console.log('already exist');
            res.json(user);
        }else{
            console.log('does not exist');
        }
    }else{
        console.log('Auth Failed');
        res.json([]);
    }
});


export default logRoute;