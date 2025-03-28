import { useState } from "react";

const UserAdd=({onSubmit})=>{
    const[username,setUsername]=useState('');
    const[nickname,setNickname]=useState('');
    const[userId,setUserId]=useState('');
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');

    const onChangeName=(e)=>{
        setUsername(e.target.value);
    };
    const onChangeNick=(e)=>{
        setNickname(e.target.value);
    };
    const onChangeId=(e)=>{
        setUserId(e.target.value);
    };
    const onChangePw=(e)=>{
        setPassword(e.target.value);
    };
    const onChangeEmail=(e)=>{
        setEmail(e.target.value);
    };
    
    const onClickSubmit=()=>{
        const userFM={
            username,
            nickname,
            userId,
            password,
            email
        };
        onSubmit(userFM);
    };

    return(
        <div className="UserAdd">
            <div className="add-inner">
                <p>
                    <label htmlFor="username">이름</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={onChangeName}
                    />
                </p>
                <p>
                    <label htmlFor="usernick">닉네임</label>
                    <input
                        type="text"
                        id="usernick"
                        value={nickname}
                        onChange={onChangeNick}
                    />
                </p>
                <p>
                    <label htmlFor="userId">아이디</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={onChangeId}
                    />
                </p>
                <p>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={onChangePw}
                    />
                </p>
                <p>
                    <label htmlFor="email">이메일</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
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

export default UserAdd;