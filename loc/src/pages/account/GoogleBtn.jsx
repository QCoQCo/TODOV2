import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {GoogleOAuthProvider,GoogleLogin} from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import axios from "axios";

const GoogleBtn=()=>{
    const navigate=useNavigate();
    const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUrl=import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const [userInfo,setUserInfo]=useState(null);
    const toMain=()=>{
        navigate('/');
        window.location.reload();
    };
    const handleGoogleLogin=async(credentialRes)=>{
        const user=jwtDecode(credentialRes.credential);
        setUserInfo(user);
        // console.log(jwtDecode(credentialRes.credential));
        localStorage.setItem('googleToken',credentialRes.credential);
        //const res=await axios.post('http://localhost:4000/userLogIO/googleLogin'
        // await axios.post("http://localhost:4000/googleAuth",{
        //     authCode:credentialRes.credential,
        // },{
        //     headers:{accept: `application/json`},
        // });
        const res=await axios.post(`${import.meta.env.VITE_API_URL}/googleLogin`,{
            id:user.email,
            // authCode:credentialRes.code,
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
                    onSuccess={(credentialResponse)=>{
                        handleGoogleLogin(credentialResponse);
                    }}
                    onError={handleGoogleLoginError}
                    // redirect_uri={redirectUrl}
                />
            </GoogleOAuthProvider>
        </>
    )
};

export default GoogleBtn;