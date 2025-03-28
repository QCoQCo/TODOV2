import { useEffect } from "react";
import { DbTest,MainPage } from "../../components/main";
import TaskManager from "../taskManager/TaskManager";

const Main=({title})=>{
    useEffect(()=>{
        title('MANAGE');
    });
    return(
        <div className="Main">
            <MainPage/>
            {/* <DbTest/> */}
            <TaskManager/>
        </div>
    )
};

export default Main;