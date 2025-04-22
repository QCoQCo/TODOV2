import { useEffect } from "react";

const GLogin=({managerMD,setGoogleMd,handleClickUserModal})=>{
    // const clientId='467988218008-3gf3fs2honpijsgvs1823c33f6cfnnln.apps.googleusercontent.com';
    // const redirectUri='http://localhost:5173/account/logincomplete';
    // const scope='https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    // const responseType='token';



    // const AuthUrl=`https://accounts.google.com/o/oauth2/auth?`+
    //         `client_id=${clientId}&`+
    //         `redirect_uri=${redirectUri}&`+
    //         `scope=${scope}&`+
    //         `response_type=${responseType}`;

    // new URLSearchParams({
    //     client_id:clientId,
    //     redirect_uri:redirectUri,
    //     scope:scope,
    //     response_type:responseType,
    // })
    // const handleLogin=()=>{
    //     window.location.href=AuthUrl;
    // }

    // useEffect(()=>{
    //     const handleLogin=()=>{
    //         window.location.href=AuthUrl;
    //     }
    //     handleLogin();
    // },[AuthUrl]);

    return(
        <div className="GLogin">
            <div className="GLogin-inner">
                <div className="GLogin-inner-header">
                    <h2>구글 로그인</h2>
                </div>
            </div>
        </div>
    )
}

export default GLogin;
