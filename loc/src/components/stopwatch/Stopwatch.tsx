import React, { useState, useEffect } from 'react';

/** 
 * StopWatch 기능을 관리합니다.
*/
const Stopwatch = () => {

    const [seconds, setSeconds] = useState<number>(0);               // 초
    const [isActive, setIsActive] = useState<boolean>(false);        // 활성화 여부 

    /**
     * 렌더링 초기에 수행하며 isActive와 seconds가 갱신되면 추가 수행합니다.
     */
    useEffect(() => {
        let interval: NodeJS.Timer;

        // [CASE1] 활성화 되어 있는 상태라면 interval을 통해 초를 늘려갑니다.
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        }
        // [CASE2] 활성화 되어 있지 않은 상태라면 시간을 초기화 합니다.
        else if (!isActive && seconds !== 0) {
            clearInterval(interval!);
        }

        // [CASE3] 해당 컴포넌트를 벗어나는 경우 초기화 합니다.
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    /**
     * 시작과 종료 버튼에 대한 관리를 수행합니다.
     */
    const handleStartStop = (): void => {
        setIsActive(!isActive);

        // 종료를 하는 경우 수행시간을 반환 받습니다.
        if (!isActive) {
            const nowTimes = formatTime(seconds);
            console.log(nowTimes);
        }
    }

    /**
     * stopwatch의 리셋 기능을 관리합니다.
    */
    const handleReset = (): void => {
        setSeconds(0);
        setIsActive(false);
    }
    /** 
     * 타이머의 시간들을 format에 맞추어 재구성합니다.
    */
    const formatTime = (time: number) => {
        const hours: number = Math.floor(time / 3600);                                  // 시간
        const minutes: number | string = Math.floor((time - (hours * 3600)) / 60);      // 분
        const seconds: number | string = time - (hours * 3600) - (minutes * 60);        // 초 

        const hoursStr: string = hours < 10 ? "0" + hours : String(hours);
        const minutesStr: string = minutes < 10 ? "0" + minutes : String(minutes);
        const secondStr: string = seconds < 10 ? "0" + seconds : String(seconds);

        return `${hoursStr} : ${minutesStr} : ${secondStr}`
    }

    // =============================================================================================================================
    return 

};



export default Stopwatch;