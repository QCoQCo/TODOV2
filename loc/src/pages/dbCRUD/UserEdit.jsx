import { useEffect,useState,useContext } from "react";
import { useParams,Navigate, useNavigate } from "react-router-dom";
import { DataContext } from "../../data";

const UserEdit=({ title })=>{
    const navigation=useNavigate();
    const{getSpecificUsser}=useContext(DataContext);
    const{userId}=useParams();
    useEffect(()=>{
        title(userId);
    });
    const[username,setUsername]=useState('');
    const[nickname,setNickname]=useState('');
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');

    const onChangeName=(e)=>{
        setUsername(e.target.value);
    };
    const onChangeNick=(e)=>{
        setNickname(e.target.value);
    };
    const onChangePw=(e)=>{
        setPassword(e.target.value);
    };
    const onChangeEmail=(e)=>{
        setEmail(e.target.value);
    };
    
    const[user,setUser]=useState({});
    useEffect(()=>{
        getSpecificUsser(userId)
            .then(data=>
                setUser(data[0])
            ).catch(err=>console.error('데이터 가져오기 실패',err));
    },[getSpecificUsser, userId]);

    // useEffect(()=>{
    //     setUsername(user.username);
    //     setNickname(user.nickname);
    //     setPassword(user.password);
    //     setEmail(user.email);
    // },[user])

    const onClickSubmit=()=>{
        const userFM={
            username:username?username:user.username,
            nickname:nickname?nickname:user.nickname,
            userId,
            password:password?password:user.password,
            email:email?email:user.email
        };

        fetch('http://localhost:4000/users',{
            method:'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(userFM),
        }).then(res=>res.json).then(data=>console.log(data));
        // navigation('/db/user-set');
        window.location.replace('/db/user-set');
    };

    return(
        <div className="UserEdit">
            <div className="form-inner">
                <p>
                    <label htmlFor="username">이름</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        placeholder={user.username}
                        onChange={onChangeName}
                    />
                </p>
                <p>
                    <label htmlFor="usernick">닉네임</label>
                    <input
                        type="text"
                        id="usernick"
                        value={nickname}
                        placeholder={user.nickname}
                        onChange={onChangeNick}
                    />
                </p>
                <p>
                    <label htmlFor="userId">아이디 {userId}</label>
                </p>
                <p>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        placeholder={user.password}
                        onChange={onChangePw}
                    />
                </p>
                <p>
                    <label htmlFor="email">이메일</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        placeholder={user.email}
                        onChange={onChangeEmail}
                    />
                </p>
            </div>
            <p className="submit">
                <button onClick={onClickSubmit}>SUBMIT</button>
            </p>
        </div>
    )
};

export default UserEdit;