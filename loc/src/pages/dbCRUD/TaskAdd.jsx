import { useState } from "react";
import './form-inner.css';

const TaskAdd=({onSubmit,userId})=>{
    const[subject,setSubject]=useState('');
    const[memo,setMemo]=useState('');
    const onChangeSubject=(e)=>{
        setSubject(e.target.value);
    };
    const onChangeMemo=(e)=>{
        setMemo(e.target.value);
    };

    const onClickSubmit=()=>{
        const taskFM={
            subject,
            memo,
            userId
        };
        onSubmit(taskFM);
    };
    return(
        <div className="TaskAdd">
            <div className="wrapper">
                <div className="form-inner">
                    <div>
                        <label htmlFor="subject">subject </label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={onChangeSubject}
                        />
                    </div>
                    <div>
                        <label htmlFor="memo">memo </label>
                        <input
                            type="text"
                            id="memo"
                            value={memo}
                            onChange={onChangeMemo}
                        />
                    </div>
                    <div className="userId">
                        <p>userid : </p>
                        <p>{userId}</p>
                    </div>
                </div>
                <div className="submit">
                    <button onClick={onClickSubmit}>SUBMIT</button>
                </div>
            </div>
        </div>
    )
};

export default TaskAdd;