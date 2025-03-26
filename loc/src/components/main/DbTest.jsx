import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../data";
import MainCharts from "./MainCharts";

const List = ({ user, func }) => {
    // if(!inputData.subject){
    //     return (
    //         <div className="wrap">
    //             <p>
    //                 {inputData.userId}
    //             </p>
    //             <p>
    //                 {inputData.nickname}
    //             </p>
    //             <p>
    //                 {inputData.username}
    //             </p>
    //             <hr />
    //         </div>
    //     )
    // }else{
    //     return (
    //         <div className="wrap">
    //             <p>
    //                 {inputData.subject}
    //             </p>
    //             <p>
    //                 {inputData.memo}
    //             </p>
    //             <p>
    //                 {inputData.userId}
    //             </p>
    //             <p>
    //                 {inputData.created_at}
    //             </p>
    //             <hr />
    //         </div>
    //     )
    // }
    // console.log('fun',user);
    // const[task,setTask]=useState([]);
    // useEffect(()=>{
    //     setTask(getUserTaskData(user.userId));
    // },[task]);
    // getUserTaskData(user.userId);
    // useEffect(() => {
    //     // func(user.userId);

    //     console.log('userId',user.userId);
    // }, []);
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
            {/* {task.map(data => */}
                <TaskList key={user.id} task={task} />
            {/* )} */}
            <hr />
            {/* <p>
                {task.subject}
            </p>
            <p>
                {task.memo}
            </p>
            <p>
                {task.created_at}
            </p> */}
        </div>
    )

};

const TaskList = ({ task }) => {
    // console.log('1', [func(userId)]);

    // console.log('2', task);
    // const taskArr=[func(userId)];
    return (
        <ul className="taskwrap">
            {task.map(data=>
                <li key={data.id}>
                    <p>{data.subject}</p>
                    <p>{data.memo}</p>
                    <p>{data.created_at}</p>
                    <p>{data.done?"달성":"미달"}</p>
                    <hr />
                </li>
            )}
        </ul>
    )
};

const DbTest = () => {

    const { userData, getUserTaskData } = useContext(DataContext);
    const [listData, setListData] = useState([]);
    const [listData2, setListData2] = useState([]);
    // console.log(userData);
    // const userIds = userData.map(data => data.userId);
    // console.log(userIds);
    // const conListData = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:4000/users");
    //         setListData(res.data);// console.log(res);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // useEffect(() => {
    //     conListData();
    // }, []);

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
            {/* <div className="row2">
                {taskData.map(data =>
                    <List key={data.id} user={data} />
                )}
            </div> */}
        </div>
    )
};

export default DbTest;
