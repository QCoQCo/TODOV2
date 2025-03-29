import { useState,createContext,useEffect,useMemo } from "react";
import axios from "axios";

export const DataContext=createContext();

export const UseDbData=({children})=>{
    const[userData,setUserData]=useState([]);
    // const[taskData,setTaskData]=useState([]);
    // const[loading,setLoading]=useState(true);
    // useEffect(()=>{});

    // const dateFormater=(date)=>{
    //     const FM=`${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`;
    //     return FM;
    // };

    const getUserData=async()=>{
        try {
            const res=await axios.get("http://localhost:4000/users");
            if(JSON.stringify(userData)!=JSON.stringify(res.data))setUserData(res.data);
        } catch (error) {
            console.log(error);
        }
        // try {
        //     const res=await axios.get("http://localhost:4000/tasks");
        //     if(JSON.stringify(taskData)!=JSON.stringify(res.data))setTaskData(res.data);
        // } catch (error) {
        //     console.log(error);
        // }
    };
    const getSpecificUsser=async(userId)=>{
        try {
            const res=await axios.get("http://localhost:4000/getUser",{params:{userId}});
            if(res.status>=200&&res.status<300){
                // const data=await res.json();
                // setTaskData(res.data);
                // return JSON.stringify(res.data);
                return res.data;
            }else{
                console.error('검색실패');
                // setTaskData([]);
                return[];
            }
            // const res=await axios.get("")
        }catch(error){
            console.log(error);
            // setTaskData([]);
            return[];
        }
    };
    const getSpecificTask=async(id)=>{
        try {
            const res=await axios.get("http://localhost:4000/tasks",{params:{id}});
            if(res.status>=200&&res.status<300){
                // const data=await res.json();
                // setTaskData(res.data);
                // return JSON.stringify(res.data);
                return res.data;
            }else{
                console.error('검색실패');
                // setTaskData([]);
                return[];
            }
            // const res=await axios.get("")
        }catch(error){
            console.log(error);
            // setTaskData([]);
            return[];
        }
    };
    const getUserTaskData=async(userId)=>{
        try {
            const res=await axios.get("http://localhost:4000/userTask",{params:{userId}});
            if(res.status>=200&&res.status<300){
                // const data=await res.json();
                // setTaskData(res.data);
                // return JSON.stringify(res.data);
                return res.data;
            }else{
                console.error('검색실패');
                // setTaskData([]);
                return[];
            }
            // const res=await axios.get("")
        }catch(error){
            console.log(error);
            // setTaskData([]);
            return[];
        }
    };

    const login=()=>{

    };
    const logout=()=>{

    };

    // useEffect(()=>{
    //     getUserData();
    // },[]);
    getUserData();
    // return userData;
    // const memoizedDbData=useMemo(()=>userData,[userData]);

    // return loading?[]:memoizedDbData;

    return(
        <DataContext.Provider value={{userData,getSpecificUsser,getSpecificTask,getUserTaskData}}>
            {children}
        </DataContext.Provider>
    )
};

// export default useDbData;