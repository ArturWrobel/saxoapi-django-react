import React, { Component } from 'react'
import axios from 'axios'
import { List, Divider, Row, Col, Card, Dropdown, Menu, message, Button } from 'antd';
/* import Strikes from './Strikes' */

export class Options extends Component {
    state = {
        loading: true,
        name: "mmm",
        expiry: [],
        no_exp: 0,
        Cstrikes: [],
        Pstrikes: [],
    }

    callAxios (name, num) {
        axios.get(`http://127.0.0.1:8000/api/yahoo/${name}/${num}/`).then(res => {
            this.setState({
                loading: false, expiry: res.data.expiry,
                Cstrikes: res.data.Cstrike, Pstrikes: res.data.Pstrike,
                Cbid: res.data.Cbid, Pbid: res.data.Pbid,
                Cask: res.data.Cask, Pask: res.data.Pask,
                CopenInterest: res.data.CopenInterest, PopenInterest: res.data.PopenInterest,
                Cvolume: res.data.Cvolume, Pvolume: res.data.Pvolume,
                CinTheMoney: res.data.CinTheMoney, PinTheMoney: res.data.PinTheMoney,
            });
            console.log("Zaladowano: ");
            console.log(res.data);
            console.log("Stan po: ")
            console.log(this.state)
            console.log(this.state.strikes)
        })

    }

    componentDidMount() {
        /* axios.get(`http://127.0.0.1:8000/api/sp500/`).then(res => {
            this.setState({ name: res.data });
            console.log(res.data)
        }) */

        /* axios.get(`http://127.0.0.1:8000/api/expiry/${this.state.name}`).then(res => {
            this.setState({ expiry: res.data, loading: false });
        }) */

        this.callAxios(this.state.name, this.state.no_exp)
    }

    onSubmitStock(newName) {
        console.log("clicked func" + newName)
        this.callAxios(newName, this.state.no_exp)
    }

    handleButtonClick(index) {
        message.info('Click on left button.' + index);
        console.log('click left button', index);
        this.callAxios(this.state.name, index)

    }

    /* listContracts = this.state.option.map(item => <li>{item}</li>) */


    render() {

        const gridStyle = {
            width: '10%',
            textAlign: 'center',
            background: "#dde0e6"
        };

        const menu = (
            <Menu>
                <List
                    bordered
                    dataSource={this.state.expiry}
                    renderItem={(item, index) => <List.Item key={index} onClick={() => this.handleButtonClick(index)}>{item}</List.Item>}
                />
            </Menu>
        );

        const stock = ["WFC", "SPY", "C", "GM", "CAT", "C", "GM", "CAT", "AAPL", "AAPL"]
        const stocksMap = stock.map((item, index) => <Card.Grid style={gridStyle} key={index} onClick={() => this.onSubmitStock(item)}>{item}</Card.Grid>)

        /* const display = Object.keys(this.state.option).map(key => {
        return [...Array(this.state.option[key])].map(x => {return <p keys = {x}>{key[0]}</p>})
        }) */
        /* const strikes = [this.state.strikes.map((item) => <p> ooo {item}</p>)] */
        /* const numberss = [this.state.expiry.map((item) => <p> {item} zzz {item}</p>)] */

        return (
            <div>
                {this.state.loading ?
                    <h1>Loading...</h1> :
                    <div>
                        <Divider orientation="centre">Chose stock and expiry:</Divider>
                        <Row>
                            <Col span={24}>
                                <Card>
                                    {stocksMap}
                                </Card>
                            </Col>
                        </Row>
                        <Divider orientation="left">
                            <Dropdown overlay={menu} placement="bottomCenter">
                                <Button>{this.state.expiry[this.state.no_exp]}</Button>
                            </Dropdown>
                Company: (Price)
                </Divider>
                        {<Row>
                            <Col span={2}/>
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div>BID</div>}
                                    bordered
                                    dataSource={this.state.Cbid}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={3}>
                                <List
                                    size="small"
                                    header={<div>Strike</div>}
                                    bordered
                                    dataSource={this.state.Cstrikes}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div>ASK</div>}
                                    bordered
                                    dataSource={this.state.Cask}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1.5}>
                                <List
                                    size="small"
                                    header={<div>Volume</div>}
                                    bordered
                                    dataSource={this.state.Cvolume}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1}>
                                <List
                                    size="small"
                                    header={<div>Open</div>}
                                    bordered
                                    dataSource={this.state.CopenInterest}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1}/>
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div>BID</div>}
                                    bordered
                                    dataSource={this.state.Cbid}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={3}>
                                <List
                                    size="small"
                                    header={<div>Strike</div>}
                                    bordered
                                    dataSource={this.state.Cstrikes}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div>ASK</div>}
                                    bordered
                                    dataSource={this.state.Cask}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1.5}>
                                <List
                                    size="small"
                                    header={<div>Volume</div>}
                                    bordered
                                    dataSource={this.state.Cvolume}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1}>
                                <List
                                    size="small"
                                    header={<div>Open</div>}
                                    bordered
                                    dataSource={this.state.CopenInterest}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={2}/>
                        </Row>}
                    </div>}
            </div>
        )
    }
}

export default Options
