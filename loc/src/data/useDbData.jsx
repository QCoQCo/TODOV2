import { useState,createContext,useEffect,useMemo } from "react";
import axios from "axios";

export const DataContext=createContext();

export const useDbData=({children})=>{
    const[dbData,setDbData]=useState([]);
    const[loading,setLoading]=useState(true);
    // useEffect(()=>{});

    const getDbData=async()=>{
        try {
            const res=await axios.get("http://localhost:4000/users");
            if(JSON.stringify(dbData)!=JSON.stringify(res.data))setDbData(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(()=>{
        getDbData();
    },[]);

    // return dbData;
    const memoizedDbData=useMemo(()=>dbData,[dbData]);

    // return loading?[]:memoizedDbData;

    return(
        <DataContext.Provider value={{memoizedDbData}}>
            {children}
        </DataContext.Provider>
    )
};

// export default useDbData;