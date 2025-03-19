import { useState, useEffect, createContext } from "react";

export const InitContext=createContext();

export const InitProvider=({children})=>{
    const[users,setUsers]=useState([]);
    const[tasks,setTasks]=useState([]);

    useEffect(()=>{
        const sessionUsers=sessionStorage.getItem('users');
        const sessionTasks=sessionStorage.getItem('tasks');

        if(sessionUsers){
            try {
                setUsers(JSON.parse(sessionUsers));
            }catch(err){
                console.error('유저 데이터 파싱 실패',err);
            }
        }

        if(sessionTasks){
            try {
                setTasks(JSON.parse(sessionTasks));
            }catch(err){
                console.error('할 일 데이터 파싱 실패',err);
            }
        }
    },[]);

    return(
        <InitContext.Provider value={{users,setUsers,tasks,setTasks}}>
            {children}
        </InitContext.Provider>
    )
};