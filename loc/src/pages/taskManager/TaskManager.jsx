import { useState,useEffect } from "react";
import axios from "axios";
import TaskTest from "./TaskTest";


const TaskManager=()=>{
    const[userId,setUserId]=useState('');

    const testInput=(e)=>{
        setUserId(e.target.value);
    };
    useEffect(()=>{
        const getUserTask=async()=>{
            await axios.get("http://localhost:4000/task");
        };
    });
    
    const userPost=()=>{
        // axios.post("http://localhost:4000/userTask",userId)
        //     .then((res)=>console.log(`${res}의 할일목록`))
        //     .catch((err)=>console.error(err));
        
    };
    return(
        <div className="taskManager">
            <h1>할일 목록 매니져</h1>
            <div className="testInput">
                <p>유저의 아이디를 입력</p>
                <input type="text" value={userId} onChange={testInput}/>
                <button onClick={userPost}>유저검색</button>
                <TaskTest userId={userId}/>
            </div>
        </div>
    )
};

export default TaskManager;