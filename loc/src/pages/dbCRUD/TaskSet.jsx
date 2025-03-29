import { useEffect,useContext,useState } from "react";
import { data, useParams } from "react-router-dom";
import { DataContext } from "../../data";

const TaskSet=({title})=>{
    const{getUserTaskData,getSpecificUsser}=useContext(DataContext)
    const{userId}=useParams();
    useEffect(()=>{
        title('TASK MOD');
    });
    const[user,setUser]=useState({});
    const[tasks,setTasks]=useState([]);
    useEffect(()=>{
        getSpecificUsser(userId)
            .then(data=>
                setUser(data[0])
            ).catch(err=>console.error('데이터 가져오기 실패',err));
        getUserTaskData(userId)
            .then(data=>
                setTasks(data)
            ).catch(err=>console.error('데이터 가져오기 실패',err));
    },[getSpecificUsser, getUserTaskData, userId]);

    console.log(user,user.username)
    return(
        <div className="TaskSet">
            <div className="user-info">
                <h2>유저 정보</h2>
                <p className="userId">
                    {userId}
                </p>
                <p className="nickname">
                    {user.nickname}
                </p>
                <p className="realname">
                    {user.username}
                </p>
            </div>
            <div className="taskList">
                <h2>할일 목록</h2>
                <ul>
                    {!tasks.length?'no task on this user.':tasks.map(it=>
                        <li key={it.id}>
                            <p>{it.subject}</p>
                            <p>{it.memo}</p>
                            <p>{it.created_at}</p>
                            <p>{it.done?'달성':'미달'}</p>
                            <button>UPDATE</button>
                            <button>DELETE</button>
                        </li>
                    )}
                </ul>
                <div className="add-btn">
                    <button>ADD</button>
                </div>
            </div>
        </div>
    )
};

export default TaskSet;