import React, { Component } from 'react'
import axios from 'axios'
import ReactApexChart from "react-apexcharts";

import { Card, Radio, Col, Row, Divider } from 'antd';

export class ApexChart extends Component {


    state = {
        cross: 21,
        /* value: 1, */
        mins: 5,
        loading: true,
        series: [{
            data: null
        }],
        options: {
            chart: {
                type: 'candlestick',
                height: '650px'
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

    getAxios(cross, time) {
        axios.get(`http://127.0.0.1:8000/api/chart/data/${cross}/${time}`).then(res => {
            this.setState({ loading: false, series: [{ data: transformState(res.data) }], cross: cross });


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

    componentDidMount() {
        this.getAxios(21,5)
    }

    onSubmitCross = (num, cross) => event => {
        console.log("clicked")
        this.setState({
            options: {
                chart: {
                    type: 'candlestick',
                    height: '650px'
                },
                title: {
                    text: cross,
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
        })
        this.getAxios(num, this.state.mins)
    }

    onChange = async e => {
        console.log('radio checked', e.target.value);
        await this.setState({ mins: e.target.value})
        this.getAxios(this.state.cross, this.state.mins)
        console.log(this.state.mins);
    };

    render() {

        const rates = [ [1343, "EURPLN"], [47, "USDPLN"], [21, "EURUSD"], [2071, "EURHUF"], [15, "EURCZK"],
                        [31242, "EURRUB"], [31, "GBP"], [17, "EURGBP"], [42, "JPY"], [18, "EURJPY"],
                        [39, "CHF"], [14, "EURCHF"], [4, "AUD"], [3946, "CAD"], [8957, "RUB"],
                        [52872, "CNH"], [13928, "TRY"], [1296, "ZAR"], [8176, "XAU"], [8177, "XAG"]]

        const buttons = rates.map(([index, rate]) => 
                        <Card.Grid className="gridChart" onClick={this.onSubmitCross(index, rate)}>{rate}</Card.Grid>)

        return (
            <div>
                {this.state.loading ?
                    <h1 className="loading">Loading...</h1> :
                    <div>
                        <Divider className = "radio" orientation="vertical">
                            <Radio.Group onChange={this.onChange} value={this.state.mins}>
                                <Radio value={5}>5M</Radio>
                                <Radio value={60}>Hour</Radio>
                                <Radio value={240}>4H</Radio>
                                <Radio value={1440}>Day</Radio>
                                <Radio value={10080}>Week</Radio>
                                <Radio value={43200}>Month</Radio>
                            </Radio.Group>
                        </Divider>
                        <Row>
                            <Col span={3}>
                                <Card  style = {{top: "10%"}}>
                                {buttons}
                                </Card>
                            </Col>
                            <Col span={21}>
                                <div id="chart">
                                    <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={600}/>
                                </div>
                            </Col>
                        </Row>
                        <Divider className = "radio" orientation="vertical"/>                        
                    </div>
                }
            </div>
        )
    }
}

export default ApexChart
