import { useState, useEffect, useContext } from "react";
import { DataContext, printDate } from "../../data";
import MainCharts from "./MainCharts";

const List = ({ user, func }) => {
    const [task, setTask] = useState([]);
    const [taskDone, setTaskDone] = useState([]);
    useEffect(() => {
        func(user.userId)
            .then(data => {
                setTask(data);
                //done만 가져오기
                //console.log(JSON.stringify(data));
                setTaskDone(data.map(dod => dod.done));
                // console.log(taskDone);
            }).catch(err => {
                console.error('데이터 가져오기 실패', err);
            });
    }, [func, user.userId]);
    return (
        <div className="user-list">
            <MainCharts urid={user.userId} taskDone={taskDone} />
            <TaskList key={user.id} task={task} />
        </div>
    )
};

const TaskList = ({ task }) => {
    return (
        <div className="task">
            <ul className="task-list">
                {!task.length?<li>no task on this user.</li>:task.map(data =>
                    <li key={data.id}>
                        <div>
                            <p>목표 : {data.subject}</p>
                            <p>{data.memo}</p>
                        </div>
                        <div className="row2">
                            <p>{printDate(data.created_at)}</p>
                            <p className={data.done ? 'yes' : 'no'}>{data.done ? "달성" : "미달"}</p>
                        </div>
                    </li>
                )}
            </ul>
        </div>
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
        <div className="main-page">
            {userData.map(data =>
                <List
                    key={data.id}
                    user={data}
                    func={getUserTaskData}
                />
            )}
        </div>
    )
};

export default MainPage;
