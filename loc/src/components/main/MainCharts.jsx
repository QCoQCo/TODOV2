import ApexCharts from 'apexcharts';

const MainCharts = ({ user }) => {
    const options = {
        chart: {
            height: 300,
            type: "radialBar"
        },
        series: [67],
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
                        color: "#111",
                        fontSize: "30px",
                        show: true
                    }
                }
            }
        },
        stroke: {
            lineCap: "round",
        },
        labels: ['sss']
    };

    return (
        <div className="MainCharts" >
            <div className="userChart"></div>
        </div >
    )
};

export default MainCharts;