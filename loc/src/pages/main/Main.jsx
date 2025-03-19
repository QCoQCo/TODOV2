import { DbTest } from "../../components/main";
import TaskManager from "../taskManager/TaskManager";

const Main=()=>{
    return(
        <div className="Main">
            <DbTest/>
            <TaskManager/>
        </div>
    )
};

export default Main;