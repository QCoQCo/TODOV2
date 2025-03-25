import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../data";

const List = ({ user, func, task }) => {
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
    useEffect(() => {
        // func(user.userId);

        console.log('userId',user.userId);
    }, []);
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
            {/* {task.map(data => */}
                <TaskList key={user.id} task={task} func={func} userId={user.userId} />
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

const TaskList = ({ task, func, userId }) => {
    console.log('1', task);
    useEffect(() => {
        func(userId);
    }, [userId]);
    // console.log('2', task);
    const taskArr=task;
    return (
        <ul className="taskwrap">
            {taskArr.map(data=>
                <li key={data.id}>
                    <p>{data.subject}</p>
                    <p>{data.memo}</p>
                    <p>{data.created_at}</p>
                    <p>{data.done}</p>
                </li>
            )}
        </ul>
    )
};

const DbTest = () => {

    const { userData, taskData, getUserTaskData } = useContext(DataContext);
    const [listData, setListData] = useState([]);
    const [listData2, setListData2] = useState([]);
    // console.log(userData);
    const userIds = userData.map(data => data.userId);
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
                        task={taskData}
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
