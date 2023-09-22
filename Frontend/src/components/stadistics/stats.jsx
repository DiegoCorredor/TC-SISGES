import React, { Component } from "react";
import { Chart } from 'primereact/chart';
import axios from 'axios';

class stadistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            URL: 'http://localhost:5000/',
            chartData: {},
            chartData2: {},
            chartData3: {}
        };

        this.chartOptions = {
            cutout: '60%'
        }
    }

    getStadistics1() {
        axios.get(this.state.URL + 'stadistics1')
        .then(res => {
            const label = res.data.data.map(data => data.label);
            const value = res.data.data.map(data => data.value);
            this.setState({
                chartData: {
                    labels: label,
                    datasets: [
                        {
                            data: value,
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#8A2BE2",
                                "#3CB371" 
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#8A2BE2",
                                "#3CB371"
                            ]
                            
                        }
                    ]
                }
            })
        })
    }

    getStadistics2() {
        axios.get(this.state.URL + 'stadistics2')
        .then(res => {
            const label = res.data.data.map(data => data.label);
            const value = res.data.data.map(data => data.value);
            this.setState({
                chartData2: {
                    labels: label,
                    datasets: [
                        {
                            data: value,
                            backgroundColor: [
                                "#FF5733",
                                "#3498DB",
                                "#FFBF00",
                                "#9B59B6",
                                "#2ECC71"
                            ],
                            hoverBackgroundColor: [
                                "#FF5733",
                                "#3498DB",
                                "#FFBF00",
                                "#9B59B6",
                                "#2ECC71"
                            ]
                            
                        }
                    ]
                }
            })
        })
    }

    getStadistics3() {
        axios.get(this.state.URL + 'stadistics3')
        .then(res => {
        const label = Object.keys(res.data.data[0]);
        const value = Object.values(res.data.data[0]);
            this.setState({
                chartData3: {
                    labels: label,
                    datasets: [
                        {
                            data: value,
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                            ]
                            
                        }
                    ]
                }
            })
        })
    }

    componentDidMount() {
        this.getStadistics1();
        this.getStadistics2();
        this.getStadistics3();
    }

    render() {
        return (
            <div>
                <div className="card text-center">
                    <p className="text-center text-3xl">Estadisticas del último mes</p>
                    <div className="flex card-container blue-container overflow-hidden text-lg">
                        <div className="flex-grow-1 flex align-items-center justify-content-center border-round m-2 px-5 py-3 gray-color">
                            <label className="text-900 font-medium">Tipos de<br />reservación</label>
                            <Chart type="doughnut" data={this.state.chartData} options={this.lightOptions} />
                        </div>
                        <div className="flex-grow-1 flex align-items-center justify-content-center border-round m-2 px-5 py-3 gray-color">
                        <label className="text-900 font-medium">Tipos de<br />servicio</label>
                            <Chart type="doughnut" data={this.state.chartData2} options={this.lightOptions} />
                        </div>
                        <div className="flex-grow-1 flex align-items-center justify-content-center border-round m-2 px-5 py-3 gray-color">
                            <label className="text-900 font-medium">Reservaciones</label>
                            <Chart type="doughnut" data={this.state.chartData3} options={this.lightOptions} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default stadistics;