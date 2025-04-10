import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const MainCharts = ({ urid, taskDone }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // if (taskDone.length == 0) return;

        const LD = taskDone.length;
        var c = 0;
        taskDone.map(tt => { if (tt) c++ });
        const rate = (c ? parseInt((c / LD) * 100) : 0);

        var options = {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            series: [rate],
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        showOn: "always",
                        name: {
                            offsetY: -20,
                            show: true,
                            color: "#555",
                            fontSize: "16px"
                        },
                        value: {
                            color: "#555",
                            fontSize: "30px",
                            show: true
                        }
                    }
                }
            },
            labels: [`${urid}`],
        };

        chartRef.current = new ApexCharts(document.querySelector(`.${urid}`), options);
        chartRef.current.render();

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        }
    }, [taskDone, urid])
    return (
        <div className="MainCharts" >
            <div className={`Chart ${urid}`}></div>
        </div >
    )
};

export default MainCharts;