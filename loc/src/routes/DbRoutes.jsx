import { Routes,Route } from "react-router-dom";
import { UserSet,TaskSet,UserEdit } from "../pages/dbCRUD";

const DbRoutes=({title})=>{
    return(
        <Routes>
            <Route path="user-set"element={<UserSet title={title}/>}/>
            <Route path="user-edit/:userId"element={<UserEdit title={title}/>}/>
            <Route path="task-set/:userId"element={<TaskSet title={title}/>}/>
        </Routes>
    )
};
export default DbRoutes;