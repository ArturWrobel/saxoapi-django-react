import React, { Component } from 'react'
import axios from 'axios'
import ReactApexChart from "react-apexcharts";

import { Card } from 'antd';

export class ApexChart extends Component {
   

        state = {
            loading: true,
            ceny: null,
            series: [{
                data: null
            }],
            options: {
                chart: {
                    type: 'candlestick',
                    height: 350
                },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left'
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                },
            },


        };
    

    async componentDidMount() {

        axios.get("http://127.0.0.1:8000/api/chart/data/").then(res => {
            this.setState({ ceny: zamiana(), loading: false, series: [{ data: zamiana() }] });


            function zamiana() {
                var transCeny = []
                for (var k = 0; k < res.data.Time.length; k++) {
                    var x = [res.data.Time[k],
                    [res.data.OpenAsk[k],
                    res.data.HighAsk[k],
                    res.data.LowAsk[k],
                    res.data.CloseAsk[k]]]
                    transCeny.push(x)
                }
                return transCeny
            }
        })
    }

    crossChange () {console.log("Clicked")
        this.setState (prevState => {
        return {isLoggedIn: !prevState.isLoggedIn}
      })
      }

    render() {
        const gridStyle = {
            width: '25%',
            textAlign: 'center',
            background: "#dde0e6"
        };

        return (
            <div>
                {this.state.loading ?
                    <h1>Loading...</h1> :
                    <div>
                <Card title="Account info" >
                    <Card.Grid style={gridStyle} onClick={this.crossChange}>EURUSD</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                </Card>
                        <br/>
                        <div id="chart">
                            <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={550} />
                        </div>
                    </div>
                }
            </div>


        )
    }
}

export default ApexChart
