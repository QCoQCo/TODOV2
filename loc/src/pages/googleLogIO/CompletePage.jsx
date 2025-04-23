import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompletePage = () => {
    const navigate=useNavigate();
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    // console.log(code);
    // console.log(jwtDecode(code));
    // const handleOAuth2Callback = () => {
    //     const hashParams = new URLSearchParams(window.location.hash.substring(1));
    //     const accessToken = hashParams.get('access_token');
    //     console.log(accessToken)
    //     if (accessToken) {
    //         fetch('http://localhost:4000/googleLogin', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ token: accessToken })
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.success) {
    //                     localStorage.setItem('jwt', data.jwt); // JWT 토큰을 로컬 스토리지에 저장
    //                     this.$router.push('/home');
    //                 } else {
    //                     alert('Authentication failed');
    //                 }
    //             });
    //     } else {
    //         alert('Failed to get access token from URL');
    //     }
    // };

    // const authorizationCode = url.searchParams.get("code");

    const handleGetAccessToken = async (authorizationCode) => {
        await axios.post(
            "http://localhost:4000/googleAuth", // 구글 소셜 로그인 엔드포인트
            {
                authCode: authorizationCode,
            },
            {
                headers: { accept: `application/json` },
            },
        );
    };
    useEffect(()=>{
        handleGetAccessToken(code);
        navigate('/');
        window.location.reload();
    },[code]);
        return (
            <div className="CompletePage">
                <div className="CompletePage-inner">
                    <div className="CompletePage-inner-header">
                        <h2>구글 로그인 완료</h2>
                    </div>
                </div>
            </div>
        )
    }

    export default CompletePage;