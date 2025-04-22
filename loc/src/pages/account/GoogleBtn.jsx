import { useNavigate } from "react-router-dom";
import {GoogleOAuthProvider,GoogleLogin} from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"

const GoogleBtn=()=>{
    const navigate=useNavigate();
    const clientId='467988218008-3gf3fs2honpijsgvs1823c33f6cfnnln.apps.googleusercontent.com';
    const redirectUrl='http://localhost:5173/account/logincomplete';
    const toMain=()=>{
        navigate('/');
        window.location.reload();
    }
    return(
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={credentialRes=>{
                        console.log(jwtDecode(credentialRes.credential));
                        toMain();
                    }}
                    onError={()=>{
                        console.log('Login Failed');
                    }}
                    // redirect_uri={redirectUrl}
                />
            </GoogleOAuthProvider>
        </>
    )
}

export default GoogleBtn;