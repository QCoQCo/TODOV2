import { useState, useEffect } from "react";
import { printDate } from "../../data";
import axios from "axios";

const TaskTest = ({ userId }) => {
    // 유저 아이디별로 할일목록을 출력하려 했으나 userId를 백엔드로 옮기는 방법을 모름
    //SELECT * FROM tasks WHERE userId=(?)
    // 내일 다시시도
    //AxiosError{message: 'Request failed with status code 404', name: 'AxiosError', code: 'ERR_BAD_REQUEST', config: {…}, request: XMLHttpRequest,}
    const [tasks, setTasks] = useState([]);

    const getTaskData = async () => {
        try {
            const res = await axios.get("http://localhost:4000/userTask", { params: { userId } });
            if (res.status >= 200 && res.status < 300) {
                // const data=await res.json();
                //리턴문으로 바꾼다면?
                setTasks(res.data);
            } else {
                console.error('검색실패');
                setTasks([]);
            }
            // const res=await axios.get("")
        } catch (error) {
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

    return (
        <div className="task-test">
            <button className="btn-search-user" onClick={getTaskData}>유저검색</button>
            <div className="task">
                <ul className="task-list">
                    {tasks.map(data =>
                        <li key={data.id}>
                            <div>
                                <p>
                                    {data.subject}
                                </p>
                                <p>
                                    {data.memo}
                                </p>
                            </div>
                            <div className="row2">
                                <p>
                                    {data.userId}
                                </p>
                                <p>
                                    {printDate(data.created_at)}
                                </p>
                            </div>
                        </li>

                    )}
                </ul>
            </div>
        </div>
    )
};

export default TaskTest;