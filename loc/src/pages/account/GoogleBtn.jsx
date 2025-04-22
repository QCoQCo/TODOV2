import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {GoogleOAuthProvider,GoogleLogin} from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import axios from "axios";

const GoogleBtn=()=>{
    const navigate=useNavigate();
    const clientId='467988218008-3gf3fs2honpijsgvs1823c33f6cfnnln.apps.googleusercontent.com';
    const redirectUrl='http://localhost:5173/account/logincomplete';
    const [userInfo,setUserInfo]=useState(null);
    const toMain=()=>{
        navigate('/');
        window.location.reload();
    }
    const handleGoogleLogin=async(credentialRes)=>{
        const user=jwtDecode(credentialRes.credential);
        setUserInfo(user);
        localStorage.setItem('googleToken',credentialRes.credential);
        //const res=await axios.post('http://localhost:4000/userLogIO/googleLogin',{
        const res=await axios.post('http://localhost:4000/googleLogin',{
            id:user.email,
            pw:user.sub,
        });
        if(res.data.length>0){
            toMain();
        }else{
            console.log('Login Failed');
        }
    };

    const handleGoogleLoginError=()=>{
        console.log('Login Failed');
    };

    return(
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={handleGoogleLoginError}
                    // redirect_uri={redirectUrl}
                />
            </GoogleOAuthProvider>
        </>
    )
}

export default GoogleBtn;