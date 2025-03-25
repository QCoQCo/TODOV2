import ApexCharts from 'apexcharts';

const MainCharts = ({ urid, taskDone }) => {
    // const chartSeries=taskDone.length;
    console.log(urid,taskDone);

    const LD=taskDone.length;
    var c = 0;
    taskDone.map(tt=>{if(tt)c++});
    const rate=parseInt((c/LD)*100);
    console.log(c,LD,rate);

    const options = {
        chart: {
            height: 300,
            type: "radialBar"
        },
        series: [rate],
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 15,
                    size: "70%"
                },
                dataLabels: {
                    showOn: "always",
                    name: {
                        offsetY: -10,
                        show: true,
                        color: "#888",
                        fontSize: "13px"
                    },
                    value: {
                        color: "#d60000",
                        fontSize: "30px",
                        show: true
                    }
                }
            }
        },
        stroke: {
            lineCap: "round",
        },
        labels: [`${urid}`]
    };
    //컴포넌트 혹은 변수의 이름이 같음
    const chart = new ApexCharts(document.querySelector(`.${urid}`),options);
    chart.render();
    return (
        <div className="MainCharts" >
            <div className={`Chart ${urid}`}></div>
        </div >
    )
};

export default MainCharts;