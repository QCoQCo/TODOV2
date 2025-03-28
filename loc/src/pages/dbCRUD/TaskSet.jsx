import { useEffect,useContext,useState } from "react";

const TaskSet=({title,user})=>{
    useEffect(()=>{
        title('TASK MOD');
    });
    return(
        <div className="TaskSet">
            {user}
        </div>
    )
};

export default TaskSet;