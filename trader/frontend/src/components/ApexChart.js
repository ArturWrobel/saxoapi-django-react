import React, { Component } from 'react'
import axios from 'axios'
import ReactApexChart from "react-apexcharts";

import { Card } from 'antd';
import { Radio } from 'antd';

export class ApexChart extends Component {


    state = {
        value: 1,
        mins: 5,
        loading: true,
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


    componentDidMount() {

        axios.get(`http://127.0.0.1:8000/api/chart/data/21/${this.state.mins}`).then(res => {
            this.setState({ loading: false, series: [{ data: transformState(res.data) }] });


            function transformState(xxx) {
                var transformed = []
                for (var k = 0; k < xxx.Time.length; k++) {
                    var item = [xxx.Time[k],
                    [xxx.OpenAsk[k],
                    xxx.HighAsk[k],
                    xxx.LowAsk[k],
                    xxx.CloseAsk[k]]]
                    transformed.push(item)
                }
                return transformed
            }
        })
    }

    onSubmitCross = (num) => event => {
        console.log("clicked")
        axios.get(`http://127.0.0.1:8000/api/chart/data/${num}/${this.state.mins}`).then(res => {
            this.setState({ loading: false, series: [{ data: transformState(res.data) }] });


            function transformState(xxx) {
                var transformed = []
                for (var k = 0; k < xxx.Time.length; k++) {
                    var item = [xxx.Time[k],
                    [xxx.OpenAsk[k],
                    xxx.HighAsk[k],
                    xxx.LowAsk[k],
                    xxx.CloseAsk[k]]]
                    transformed.push(item)
                }
                return transformed
            }
        })
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
        switch (e.target.value) {
            case 1:
                this.setState({ mins: 5 });
                break;
            case 2:
                this.setState({ mins: 60 });
                break;
            case 3:
                this.setState({ mins: 30 });
                break;
            case 4:
                this.setState({ mins: 15 });
                break;
            default:
                this.setState({ mins: 5 });
                break;
        }
    };

    render() {
        const gridStyle = {
            width: '20%',
            textAlign: 'center',
            background: "#dde0e6"
        };

        return (
            <div>
                {this.state.loading ?
                    <h1>Loading...</h1> :
                    <div>
                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                            <Radio value={1}>5 Min</Radio>
                            <Radio value={2}>Hourly</Radio>
                            <Radio value={3}>Daily</Radio>
                            <Radio value={4}>Weekly</Radio>
                        </Radio.Group>
                        <Card>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(1343)}>EURPLN</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(47)}>USDPLN</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(2071)}>EURHUF</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(15)}>EURCZK</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(31242)}>EURRUB</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(21)}>EURUSD</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(18)}>EURJPY</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(31)}>GBPUSD</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(17)}>EURGBP</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(14)}>EURCHF</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(42)}>JPY</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(39)}>CHF</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(4)}>AUD</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(3946)}>CAD</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(52872)}>CNH</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(8176)}>XAU</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(8177)}>XAG</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(8957)}>RUB</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(13928)}>TRY</Card.Grid>
                            <Card.Grid style={gridStyle} onClick={this.onSubmitCross(1296)}>ZAR</Card.Grid>
                        </Card>
                        <br />
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
