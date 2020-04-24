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
        test: [],
        strikes: []
    }

    componentDidMount() {

        /* axios.get(`http://127.0.0.1:8000/api/sp500/`).then(res => {
            this.setState({ name: res.data });
            console.log(res.data)
        }) */

        axios.get(`http://127.0.0.1:8000/api/expiry/${this.state.name}`).then(res => {
            this.setState({ expiry: res.data, loading: false});
            console.log(this.state)
        })

        axios.get(`http://127.0.0.1:8000/api/yahoo/${this.state.name}/${this.state.no_exp}`).then(res => {
            this.setState({ loading: false, expiry: res.data.expiry});
            
            console.log(this.state)
            /* console.log(this.state.option.contractSymbol[0]); */
        })

        /* axios.get(`http://127.0.0.1:8000/test/${this.state.name}/${this.state.no_exp}`).then(res => {
            this.setState({ expiry: res.data.expiry });
            console.log(typeof res.data);
            console.log("oto striki "+ this.state.test + "koniec");
            console.log(this.state)
        }) */
    }

    onSubmitStock(newName) {
        console.log("clicked func" + newName)
        axios.get(`http://127.0.0.1:8000/api/yahoo/${newName}/${this.state.no_exp}`).then(res => {
            this.setState({ option: res.data });
            /* console.log(res.data.contractSymbol);
            console.log(this.state) */
        })
    }

    handleButtonClick(index) {
        message.info('Click on left button.' + index);
        console.log('click left button', index);
        this.setState({
            no_exp: index,
        });
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
      
        const stock = ["C", "GM", "CAT", "C", "GM", "CAT", "AAPL", "AAPL"]
        const stocksMap = stock.map((item, index) => <Card.Grid style={gridStyle} key={index} onClick={() => this.onSubmitStock(item)}>{item}</Card.Grid>)

        /* const display = Object.keys(this.state.option).map(key => {
        return [...Array(this.state.option[key])].map(x => {return <p keys = {x}>{key[0]}</p>})
        }) */
        /* const strikes = [this.state.expiry.map((item) => <p> ooo {item}</p>)]
        const numberss = [this.state.expiry.map((item) => <p> {item} zzz {item}</p>)] */

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
                    <Col span={12}>
                        {/* <Strikes numbers ={display}/> */}
                        {/* <Strikes numbers ={strikes}/>

                        <Strikes numbers ={numberss}/> */}
                        <List
                            size="small"
                            header={<div>CALL</div>}
                            footer={<div>Footer</div>}
                            bordered
                            dataSource={this.state.stikes}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </Col>
                    <Col span={12}>
                        <List
                            size="small"
                            header={<div>PUT</div>}
                            footer={<div>Footer</div>}
                            bordered
                            dataSource={this.state.expiry}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </Col>
                </Row>}
            </div>}
        </div>
        )
    }
}

export default Options
