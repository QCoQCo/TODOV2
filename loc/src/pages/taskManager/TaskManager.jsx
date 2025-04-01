import { useState, useEffect } from "react";
import axios from "axios";
import TaskTest from "./TaskTest";


const TaskManager = () => {
    const [userId, setUserId] = useState('');

    const testInput = (e) => {
        setUserId(e.target.value);
    };
    // useEffect(()=>{
    //     const getUserTask=async()=>{
    //         await axios.get("http://localhost:4000/task");
    //     };
    // });


    return (
        <div className="taskManager">
            <h1>할일 목록</h1>
            <div className="testInput">
                <p className="input-box"><input type="text" value={userId} onChange={testInput} placeholder="사용자 아이디를 입력해주세요." /></p>
                <TaskTest userId={userId} />
            </div>
        </div>
    )
};

export default TaskManager;