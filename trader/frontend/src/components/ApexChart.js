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

    onSubmitCross = (num) => event => {
        console.log("clicked")
        this.getAxios(num, this.state.mins)
    }

    onChange = async e => {
        console.log('radio checked', e.target.value);
        await this.setState({ mins: e.target.value})
        this.getAxios(this.state.cross, this.state.mins)
        console.log(this.state.mins);
    };

    render() {
        return (
            <div>
                {this.state.loading ?
                    <h1>Loading...</h1> :
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
                                <Card>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(1343)}>EURPLN</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(47)}>USDPLN</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(2071)}>EURHUF</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(15)}>EURCZK</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(31242)}>EURRUB</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(21)}>EURUSD</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(18)}>EURJPY</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(31)}>GBPUSD</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(17)}>EURGBP</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(14)}>EURCHF</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(42)}>JPY</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(39)}>CHF</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(4)}>AUD</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(3946)}>CAD</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(52872)}>CNH</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(8176)}>XAU</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(8177)}>XAG</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(8957)}>RUB</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(13928)}>TRY</Card.Grid>
                                    <Card.Grid className="gridChart" onClick={this.onSubmitCross(1296)}>ZAR</Card.Grid>
                                </Card>
                            </Col>
                            <Col span={21}>
                                <div id="chart">
                                    <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={600} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}

export default ApexChart
