import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Signup from "./Signup";
import FindId from "./FindId";
import FindPw from "./FindPw";
import { GLogin } from "../googleLogIO";
import './UserMng.css';

const UserMng = ({ managerMD, handleClickUserModal }) => {

    const [idMd, setIdMd] = useState(false);
    const [pwMd, setPwMd] = useState(false);
    const [googleMd,setGoogleMd] = useState(false);

    const toLogin = () => {
        setIdMd(false);
        setPwMd(false);
    }
    const swMd = () => {
        var temp = idMd;
        setIdMd(pwMd);
        setPwMd(temp);
    };

    // const loginSet=useGoogleLogin({
    //     onSuccess:res=>console.log(jwtDecode(res)),
    // });
    const toGoogleLogin=()=>{
        // setIdMd(false);
        // setPwMd(false);
        // handleClickUserModal();
        // // setGoogleMd(true);
        const clientId='467988218008-3gf3fs2honpijsgvs1823c33f6cfnnln.apps.googleusercontent.com';
        const redirectUrl='http://localhost:5173/account/logincomplete';
        const scope='https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
        const responseType='code';
        
        const AuthUrl=`https://accounts.google.com/o/oauth2/auth?`+
                `client_id=${clientId}&`+
                `redirect_uri=${redirectUrl}&`+
                `scope=${scope}&`+
                `response_type=${responseType}`;
        
        window.location.href=AuthUrl;
        
        // window.location.href=`https://accounts.google.com/o/oauth2/v2/auth?
        //     client_id=${clientId}
		//     &redirect_uri=${redirectUrl}
		//     &response_type=code
		//     &scope=${scope}`;
    };


    useEffect(() => {
        setIdMd(false);
        setPwMd(false);
        setGoogleMd(false);
    }, []);
    // const handleCloseManager=()=>{
    //     handleClickUserModal();
    // };

    return (
        <div className="UserMng">
            <div className="manager-inner">
                <div className="top-comp">
                    <div className="back-btn" onClick={handleClickUserModal}>
                        <img src="/assets/images/back-btn.png" alt="back" />
                    </div>
                    <h2>SIGNIN</h2>
                </div>
                {!idMd && !pwMd && !googleMd && <Signup managerMD={managerMD} setIdMd={setIdMd} setPwMd={setPwMd} handleClickUserModal={handleClickUserModal} toGoogleLogin={toGoogleLogin} />}
                {idMd && !pwMd && !googleMd && <FindId managerMD={managerMD} setIdMd={setIdMd} setPwMd={setPwMd} />}
                {!idMd && pwMd && !googleMd && <FindPw managerMD={managerMD} setIdMd={setIdMd} setPwMd={setPwMd} />}
                {!idMd && !pwMd && googleMd && <GLogin managerMD={managerMD} setGoogleMd={setGoogleMd} handleClickUserModal={handleClickUserModal} />}
            </div>
        </div>
    )
};

export default UserMng;