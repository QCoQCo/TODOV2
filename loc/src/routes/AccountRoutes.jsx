import { Routes,Route } from "react-router-dom";
import {
    UserMng,FindId,FindPw,Signin,Signup,SignupComplete
} from "../pages/account";
import { CompletePage } from "../pages/googleLogIO";

const AccountRoutes=()=>{
    return(
        <Routes>
            <Route path='u-manage' element={<UserMng/>}/>
            <Route path='find-id' element={<FindId />} />
            <Route path='find-pw' element={<FindPw />} />
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />} />
            <Route path='signup-complete' element={<SignupComplete />} />
            <Route path="logincomplete" element={<CompletePage />} />
        </Routes>
    )
};


export default AccountRoutes;