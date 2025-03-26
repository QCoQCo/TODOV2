import { useState,useEffect } from 'react';
import ApexCharts from 'apexcharts';

const MainCharts = ({ urid, taskDone }) => {
    console.log(urid,taskDone);
    // const chartSeries=taskDone.length;
    // const[dataLenth,setDataLenth]=useState(0);
    // const[count,setCount]=useState(0);
    // const getRate=(L,td)=>{
    //     var C=0;
    //     td.map(tt=>{if(tt)C++});

    // };
    useEffect(()=>{
        const LD=taskDone.length;
        var c = 0;
        taskDone.map(tt=>{if(tt)c++});
        const rate=(c?parseInt((c/LD)*100):0);
        console.log(c,LD,rate);

        var options = {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            series: [rate],
            plotOptions:{
                radialBar:{
                    dataLabels: {
                        showOn: "always",
                        name: {
                            offsetY: -10,
                            show: true,
                            color: "#fff",
                            fontSize: "13px"
                        },
                        value: {
                            color: "#fff",
                            fontSize: "30px",
                            show: true
                        }
                    }
                }
            },
            labels: [`${urid}`],
        };
        
        //컴포넌트 혹은 변수의 이름이 같음
        new ApexCharts(document.querySelector(`.${urid}`),options).render();
    },[taskDone,urid])
    return (
        <div className="MainCharts" >
            <div className={`Chart ${urid}`}></div>
        </div >
    )
};

export default MainCharts;