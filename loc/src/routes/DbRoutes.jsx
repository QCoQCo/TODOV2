import { Routes,Route } from "react-router-dom";
import { UserSet,TaskSet } from "../pages/dbCRUD";

const DbRoutes=({title})=>{
    return(
        <Routes>
            <Route path="user-set"element={<UserSet title={title}/>}/>
            <Route path="task-set"element={<TaskSet title={title}/>}/>
        </Routes>
    )
};
export default DbRoutes;