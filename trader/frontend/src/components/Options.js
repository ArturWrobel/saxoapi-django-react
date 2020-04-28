import React, { Component } from 'react'
import axios from 'axios'
import { List, Row, Col, Card, Dropdown, Menu, Button } from 'antd';
/* import Strikes from './Strikes' */
/* 
import '../containers/Layout.css' */

export class Options extends Component {
    state = {
        loading: true,
        name: "C",
        expiry: [],
        no_exp: 0,
    }

    callAxios(name, num) {
        axios.get(`http://127.0.0.1:8000/api/yahoo/${name}/${num}/`).then(res => {
            this.setState({
                loading: false, expiry: res.data.expiry,
                info: res.data.info,
                name: name,
                no_exp: num,

                Cstrikes: res.data.Cstrike, Pstrikes: res.data.Pstrike,
                Cbid: res.data.Cbid, Pbid: res.data.Pbid,
                Cask: res.data.Cask, Pask: res.data.Pask,
                CopenInterest: res.data.CopenInterest, PopenInterest: res.data.PopenInterest,
                Cvolume: res.data.Cvolume, Pvolume: res.data.Pvolume,

                XCstrikes: res.data.XCstrike, XPstrikes: res.data.XPstrike,
                XCbid: res.data.XCbid, XPbid: res.data.XPbid,
                XCask: res.data.XCask, XPask: res.data.XPask,
                XCopenInterest: res.data.XCopenInterest, XPopenInterest: res.data.XPopenInterest,
                XCvolume: res.data.XCvolume, XPvolume: res.data.XPvolume,
            });
            /* console.log("Zaladowano: ");
            console.log(res.data);
            console.log("Stan po: ")
            console.log(this.state)
            console.log(this.state.strikes)
            console.log(this.state.info) */
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
        this.callAxios(newName, this.state.no_exp)
    }

    handleButtonClick(index) {
        this.callAxios(this.state.name, index)
    }

    render() {

        const menu = (
            <Menu>
                <List
                    bordered
                    dataSource={this.state.expiry}
                    renderItem={(item, index) => <List.Item key={index} onClick={() => this.handleButtonClick(index)}>{item}</List.Item>}
                />
            </Menu>
        );

        const stock = ["C", "GM", "F", "CAT", "GE", "HAL", "BA", "IBM", "CSCO", "GS", "WFC", "BAC", "AAPL", "MMM", "TSLA", "FB", "AMZN", "NFLX", "SPY", "DIA"]
        const stocksMap = stock.map((item, index) => <Card.Grid className = "gridStyle" key={index} onClick={() => this.onSubmitStock(item)}>{item}</Card.Grid>)

        return (
            <div>
                {this.state.loading ?
                    <h1 className = "loading">Loading...</h1> :
                    <div>
                        <br />
                        <Row justify="space-between" className ="sticky">
                            <Col span={3}><h3>Price: {this.state.info[1]}</h3></Col>
                            <Col span={3}><h3>Previous: {this.state.info[2]}</h3></Col>
                            <Col span={2}><p>Change:<h3 className="bold" style={{ color: this.state.info[3] < 0 ? "red" : "blue" }}>{this.state.info[3]}%</h3></p></Col>
                            <Col span={4}><h2 className="name">{this.state.info[0]}</h2></Col>
                            <Col span={3}>{this.state.info[4]}</Col>
                            <Col span={3}>{this.state.info[5]}</Col>
                            <Col span={2}>
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <Button className="change col">{this.state.expiry[this.state.no_exp]}</Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} className="sticky1">
                                <Card>
                                    {stocksMap}
                                </Card>
                            </Col>
                        </Row>
                        <div className="raws">
                        <Row>
                            <Col span={2} />
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div className="bold">BID</div>}
                                    bordered
                                    dataSource={this.state.Cbid}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={3}>
                                <List
                                    size="small"
                                    header={<div className="bold">Strike</div>}
                                    bordered
                                    dataSource={this.state.Cstrikes}
                                    renderItem={(item, index) => <List.Item key={index} className="strike bold">{item} </List.Item>}
                                />
                            </Col>
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div className="bold">ASK</div>}
                                    bordered
                                    dataSource={this.state.Cask}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1.5}>
                                <List
                                    size="small"
                                    header={<div className="bold">Volume</div>}
                                    bordered
                                    dataSource={this.state.Cvolume}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1}>
                                <List
                                    size="small"
                                    header={<div className="bold">Open</div>}
                                    bordered
                                    dataSource={this.state.CopenInterest}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1} />
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div className="bold">BID</div>}
                                    bordered
                                    dataSource={this.state.Pbid}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={3}>
                                <List
                                    size="small"
                                    header={<div className="bold">Strike</div>}
                                    bordered
                                    dataSource={this.state.Pstrikes}
                                    renderItem={(item, index) => <List.Item key={index} className="strike bold">{item} </List.Item>}
                                />
                            </Col>
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div className="bold">ASK</div>}
                                    bordered
                                    dataSource={this.state.Pask}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1.5}>
                                <List
                                    size="small"
                                    header={<div className="bold">Volume</div>}
                                    bordered
                                    dataSource={this.state.Pvolume}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1}>
                                <List
                                    size="small"
                                    header={<div className="bold">Open</div>}
                                    bordered
                                    dataSource={this.state.PopenInterest}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={2} />
                        </Row>
                        <Row>
                            <Col span={24} className="mid">
                                <h3 className="bold">{this.state.info[1]}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={2} />
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div className="bold">BID</div>}
                                    bordered
                                    dataSource={this.state.XCbid}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={3}>
                                <List
                                    size="small"
                                    header={<div className="bold">Strike</div>}
                                    bordered
                                    dataSource={this.state.XCstrikes}
                                    renderItem={(item, index) => <List.Item key={index} className="strike bold">{item} </List.Item>}
                                />
                            </Col>
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div className="bold">ASK</div>}
                                    bordered
                                    dataSource={this.state.XCask}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1.5}>
                                <List
                                    size="small"
                                    header={<div className="bold">Volume</div>}
                                    bordered
                                    dataSource={this.state.XCvolume}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1}>
                                <List
                                    size="small"
                                    header={<div className="bold">Open</div>}
                                    bordered
                                    dataSource={this.state.XCopenInterest}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1} />
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div className="bold">BID</div>}
                                    bordered
                                    dataSource={this.state.XPbid}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={3}>
                                <List
                                    size="small"
                                    header={<div className="bold">Strike</div>}
                                    bordered
                                    dataSource={this.state.XPstrikes}
                                    renderItem={(item, index) => <List.Item key={index} className="strike bold">{item} </List.Item>}
                                />
                            </Col>
                            <Col span={2}>
                                <List
                                    size="small"
                                    header={<div className="bold">ASK</div>}
                                    bordered
                                    dataSource={this.state.XPask}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1.5}>
                                <List
                                    size="small"
                                    header={<div className="bold">Volume</div>}
                                    bordered
                                    dataSource={this.state.XPvolume}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={1}>
                                <List
                                    size="small"
                                    header={<div className="bold">Open</div>}
                                    bordered
                                    dataSource={this.state.XPopenInterest}
                                    renderItem={(item, index) => <List.Item key={index}>{item} </List.Item>}
                                />
                            </Col>
                            <Col span={2} />
                        </Row>
                        </div>
                    </div>}
            </div>
        )
    }
}

export default Options
