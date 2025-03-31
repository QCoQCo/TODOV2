import { useEffect,useContext,useState } from "react";
import { useParams,Link } from "react-router-dom";
import { DataContext,printDate } from "../../data";
import TaskAdd from "./TaskAdd";
import MainCharts from "../../components/main/MainCharts";
import './form-inner.css';

const TaskSet=({title})=>{
    const{getUserTaskData,getSpecificUsser}=useContext(DataContext)
    const{userId}=useParams();
    useEffect(()=>{
        title('TASK MOD');
    });
    const[isAdd,setIsAdd]=useState(false);

    const AddComp=()=>{
        setIsAdd(!isAdd);
    };

    const[user,setUser]=useState({});
    const[tasks,setTasks]=useState([]);
    const[taskDone,setTaskDone]=useState([]);
    useEffect(()=>{
        getSpecificUsser(userId)
            .then(data=>
                setUser(data[0])
            ).catch(err=>console.error('데이터 가져오기 실패',err));
        getUserTaskData(userId)
            .then(data=>{
                setTasks(data);
                setTaskDone(data.map(dod=>dod.done));
        }).catch(err=>console.error('데이터 가져오기 실패',err));
    },[getSpecificUsser, getUserTaskData, userId]);

    console.log(tasks,taskDone);

    const onClickDone=(id,done)=>{
        const taskFM={
            done:!done,
            id
        };

        fetch('http://localhost:4000/donetask',{
            method:'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(taskFM),
        }).then(res=>res.json).then(data=>console.log(data));
        window.location.reload();
    };

    const onDelete=(id)=>{
        fetch('http://localhost:4000/tasks',{
            method:'DELETE',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body:JSON.stringify({id})
        }).then(res=>res.json).then(data=>console.log(data));
        window.location.reload();
    };

    const onSubmit=(data)=>{
        // e.preventDefault();
        fetch('http://localhost:4000/tasks',{
            method:'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data),
        }).then(res=>res.json).then(data=>console.log(data));
        window.location.reload();
    };

    return(
        <div className="TaskSet">
            <div className="user-info">
                <h2>유저 정보</h2>
                <div className="userId">
                    <p>아이디 : </p>
                    <p>{userId}</p>
                </div>
                <div className="nickname">
                    <p>닉네임 : </p>
                    <p>{user.nickname}</p>
                </div>
                <div className="realname">
                    <p>이름 : </p>
                    <p>{user.username}</p>
                </div>
            </div>
            <div className="user-chart">
                <h2>유저 통계</h2>
                <MainCharts urid={userId} taskDone={taskDone}/>
            </div>
            <div className="taskList">
                <h2>할일 목록</h2>
                <ul>
                    {!tasks.length?'no task on this user.':tasks.map(it=>
                        <li key={it.id}>
                            <div className="subject">
                                <p>제목 : </p>
                                <p>{it.subject}</p>
                            </div>
                            <div className="memo">
                                <p>메모 : </p>
                                <p>{it.memo}</p>
                            </div>
                            <div className="created_at">
                                <p>생성시간 : </p>
                                <p>{printDate(it.created_at)}</p>
                            </div>
                            <div className="done">
                                <p>{it.done?'달성':'미달'}</p>
                                <button onClick={()=>onClickDone(it.id,it.done)}>달성여부</button>
                            </div>
                            <div className="main-btn">
                                <Link to={`/db/task-edit/${it.id}`}>UPDATE</Link>
                                <button onClick={()=>onDelete(it.id)}>DELETE</button>
                            </div>
                        </li>
                    )}
                </ul>
                <p className="add-btn">
                    <button onClick={AddComp}>ADD TASK</button>
                </p>
                {isAdd&&<TaskAdd onSubmit={onSubmit} userId={userId}/>}
            </div>
        </div>
    )
};

export default TaskSet;