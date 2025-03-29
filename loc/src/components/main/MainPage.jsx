import { useState, useEffect, useContext } from "react";
import { DataContext,printDate } from "../../data";
import MainCharts from "./MainCharts";

const List = ({ user, func }) => {
    const[task,setTask]=useState([]);
    const[taskDone,setTaskDone]=useState([]);
    useEffect(() => {
        func(user.userId)
            .then(data=>{
                setTask(data);
                //done만 가져오기
                //console.log(JSON.stringify(data));
                setTaskDone(data.map(dod=>dod.done));
                // console.log(taskDone);
            }).catch(err=>{
                console.error('데이터 가져오기 실패',err);
            });
    }, [func,user.userId]);
    return (
        <div className="wrap">
            <p>
                {user.userId}
            </p>
            <p>
                {user.nickname}
            </p>
            <p>
                {user.username}
            </p>
            <hr />
            <MainCharts urid={user.userId}taskDone={taskDone}/>
            <hr />
            <TaskList key={user.id} task={task}/>
            <hr />
        </div>
    )

};

const TaskList = ({ task }) => {
    return (
        <ul className="taskwrap">
            {task.map(data=>
                <li key={data.id}>
                    <p>{data.subject}</p>
                    <p>{data.memo}</p>
                    <p>{printDate(data.created_at)}</p>
                    <p>{data.done?"달성":"미달"}</p>
                    <hr />
                </li>
            )}
        </ul>
    )
};

const MainPage = () => {

    const { userData, getUserTaskData } = useContext(DataContext);
    try {
        // console.log(printDate(new Date('')))
    } catch (error) {
        console.error(error)
    }
    return (
        <div className="data">
            <div className="row1">
                {userData.map(data =>
                    <List
                        key={data.id}
                        user={data}
                        func={getUserTaskData}
                    />
                )}
            </div>

        </div>
    )
};

export default MainPage;
