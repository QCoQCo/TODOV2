import { useEffect,useState,useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../data";
import './form-inner.css';

const TaskEdit=({title})=>{
    const{getSpecificTask}=useContext(DataContext);
    const{id}=useParams();
    useEffect(()=>{
        title('TASK EDITOR');
    });
    // console.log(id)
    const[subject,setSubject]=useState('');
    const[memo,setMemo]=useState('');
    const onChangeSubject=(e)=>{
        setSubject(e.target.value);
    };
    const onChangeMemo=(e)=>{
        setMemo(e.target.value);
    };

    const[task,setTask]=useState({});

    useEffect(()=>{
        getSpecificTask(id)
            .then(data=>
                setTask(data[0])
            ).catch(err=>console.error('데이터 가져오기 실패',err));
    },[getSpecificTask,id]);
    // console.log(task,task.subject)

    const onClickSubmit=()=>{
        const taskFM={
            subject:subject?subject:task.subject,
            memo:memo?memo:task.memo,
            id
        };

        fetch('http://localhost:4000/tasks',{
            method:'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(taskFM),
        }).then(res=>res.json).then(data=>console.log(data));
        // navigation('/db/user-set');
        window.location.replace(`/db/task-set/${task.userId}`);
    };

    return(
        <div className="TaskEdit">
            <div className="wrapper">
                <div className="form-inner">
                    <div>
                        <label htmlFor="subject">subject </label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            placeholder={task.subject}
                            onChange={onChangeSubject}
                        />
                    </div>
                    <div>
                        <label htmlFor="memo">memo </label>
                        <input
                            type="text"
                            id="memo"
                            value={memo}
                            placeholder={task.memo}
                            onChange={onChangeMemo}
                        />
                    </div>
                    <div className="userId">
                        <p>userid : </p>
                        <p>{task.userId}</p>
                    </div>
                </div>
                <div className="submit">
                    <button onClick={onClickSubmit}>SUBMIT</button>
                </div>
            </div>
        </div>
    )
};

export default TaskEdit;