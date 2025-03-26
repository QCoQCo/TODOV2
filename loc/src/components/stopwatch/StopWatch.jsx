import { useState,useRef } from 'react';
import './StopWatch.css';

const StopWatch=({isStw,setIsStw})=>{
    const[running,setRunning]=useState(false);
    const[time,setTime]=useState(0);
    const[lap,setLap]=useState([]);
    return(
        <div className={`StopWatch ${isStw?'view':''}`}>
            <div className="watch-inner">
                StopWatch
            </div>
        </div>
    )
};

export default StopWatch;