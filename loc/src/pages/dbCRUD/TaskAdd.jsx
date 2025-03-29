import { useState } from "react";

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
            <div className="form-inner">
                <p>
                    <label htmlFor="subject">subject </label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={onChangeSubject}
                    />
                </p>
                <p>
                    <label htmlFor="memo">memo </label>
                    <input
                        type="text"
                        id="memo"
                        value={memo}
                        onChange={onChangeMemo}
                    />
                </p>
                <div className="userId">
                    <p>userid : </p>
                    <p>{userId}</p>
                </div>
            </div>
            <div className="submit">
                <button onClick={onClickSubmit}>SUBMIT</button>
            </div>
        </div>
    )
};

export default TaskAdd;