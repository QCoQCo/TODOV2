import { useState,useEffect } from "react";
import axios from "axios";

const TaskTest=({userId})=>{
    // 유저 아이디별로 할일목록을 출력하려 했으나 userId를 백엔드로 옮기는 방법을 모름
    //SELECT * FROM tasks WHERE userId=(?)
    // 내일 다시시도
    const[tasks,setTasks]=useState([]);

    const getTaskData=async()=>{
        try {
            const res= await axios.get("http://localhost:4000/userTask",userId);
            //AxiosError{message: 'Request failed with status code 404', name: 'AxiosError', code: 'ERR_BAD_REQUEST', config: {…}, request: XMLHttpRequest,}
            if(res.ok){
                const data=await res.json();
                setTasks(data);
            }else{
                console.error('검색실패');
                setTasks([]);
            }
        }catch(error){
            console.log(error);
            setTasks([]);
        }
    };

    // useEffect(()=>{
    //     getTaskData();
    // });

    // const userPost=()=>{
    //     axios.get("http://localhost:4000/userTask",userId)
    //         .then((res)=>console.log(`${res}의 할일목록`))
    //         .catch((err)=>console.error(err));
    //     getTaskData();
    // };

    return(
        <div>
            <button onClick={getTaskData}>유저검색</button>
            <ul>
                {tasks.map(data=>
                    <li key={data.id}>
                        <p>
                            {data.subject}
                        </p>
                        <p>
                            {data.memo}
                        </p>
                        <p>
                            {data.userId}
                        </p>
                        <p>
                            {data.created_at}
                        </p>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default TaskTest;