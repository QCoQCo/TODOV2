import { useState,useEffect, useRef } from 'react';
import './StopWatch.css';

const StopWatch=({isStw,setIsStw})=>{
    const[initTime,setInitTime]=useState(0);
    const[curTime,setCurTime]=useState(0);
    const[savedTime,setSavedTime]=useState(0);

    const[isRunning,setIsRunning]=useState(false);
    const interval=useRef();

    const timeFormmater=(timedelta)=>{
        const[ss,mm,hh]=[
            parseInt(timedelta/1000)%60,
            parseInt(timedelta/(60*1000))%60,
            parseInt(timedelta/(60*60*1000)),
        ].map((x)=>
            x.toLocaleString("en-US",{
                minimumIntegerDigits: 2,
                useGrouping: false,
            })
        );
        return`${hh}:${mm}:${ss}`;
    };

    useEffect(()=>{
        const time=new Date().getTime();
        setCurTime(time);
        setInitTime(time);
    },[]);

    useEffect(()=>{
        if(isRunning){
            const time=new Date().getTime();
            setCurTime(time);
            setInitTime(time);
            interval.current=setInterval(()=>{
                setCurTime(new Date().getTime());
            },10);
        }else{
            clearInterval(interval.current);
            setSavedTime((t)=>t+curTime-initTime);
            const time = new Date().getTime();
            setCurTime(time);
            setInitTime(time);
        }
    },[isRunning]);

    const onRun=()=>{
        setIsRunning((state)=>!state);
    };

    const onStop=()=>{
        const time=new Date().getTime();
        setIsRunning(false);
        setCurTime(time);
        setInitTime(time);
        setSavedTime(0);
    };

    return(
        <div className={`StopWatch ${isStw?'view':''}`}>
            <div className="watch-inner">
                <p className='watch'>{timeFormmater(curTime-initTime+savedTime)}</p>
                <p className="btn">
                    <button onClick={onRun}>{isRunning?'PAUSE':'PLAY'}</button>
                    <button onClick={onStop}>RESET</button>
                </p>
            </div>
        </div>
    )
};

export default StopWatch;