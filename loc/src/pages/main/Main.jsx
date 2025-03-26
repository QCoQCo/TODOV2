import { useEffect } from "react";
import { DbTest } from "../../components/main";
import TaskManager from "../taskManager/TaskManager";

const Main=({getPageName})=>{
    useEffect(()=>{
        getPageName('MANAGE');
    });
    return(
        <div className="Main">
            <DbTest/>
            <TaskManager/>
        </div>
    )
};

export default Main;