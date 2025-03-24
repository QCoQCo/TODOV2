import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../data";

export const List = ({ user }) => {
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
            {/* <p>
                {task.subject}
            </p>
            <p>
                {task.memo}
            </p>
            <p>
                {task.created_at}
            </p> */}
            <hr />
            <hr />
        </div>
    )

};

export const TaskList = ({ userId, func, task }) => {
    func(userId);
    return (
        <div className="wrap">
            <p>
                {task.subject}
            </p>
            <p>
                {task.memo}
            </p>
            <p>
                {task.created_at}
            </p>
        </div>
    )
};

const DbTest = () => {

    const { userData, taskData, getUserTaskData } = useContext(DataContext);
    const [listData, setListData] = useState([]);
    const [listData2, setListData2] = useState([]);
    console.log(userData);

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
                    <div className="db_wapper"key={data.id}>
                        <List user={data}/>
                        {/* <TaskList userId={data.userId} func={getUserTaskData}task={taskData}/> */}
                    </div>
                )}
            </div>
            <div className="row2">
                {taskData.map(data =>
                    <List key={data.id} user={data} />
                )}
            </div>
        </div>
    )
};

export default DbTest;
