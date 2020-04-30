import React, { Component } from 'react'
import axios from 'axios'

import CardList from './CardList'

import { Row, Col, Card } from 'antd';


export class Home extends Component {

    state = {
        loading: true,
        dane: null,
        numbers: [1, 2, 3, 4, 5],
        portfolio: null

    }

    async componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/chart/data/18/5/").then(res => {
            this.setState({ dane: res.data, loading: false });
            console.log(res.data.CloseAsk[0]);
        })

        axios.get("http://127.0.0.1:8000/api/portfolio/").then(res => {
            this.setState({ portfolio: res.data, loading: false });
            console.log(res.data);
        })
    }
    
    render() {

        const doubled = this.state.numbers.map(number => number * 2 + " ");

        let tran = Array(this.state.numbers.map(x => x*5))

        
        return (
            <div>
                <div>
                {this.state.loading || !this.state.dane ? (
                    <div className = "loading">Loading...</div>
                ) : (
                        <div>

<div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  </div>

                            <p>Account value: {this.state.portfolio[0]['AccountValue']}</p>
                            <p>Account value month: {this.state.portfolio[0]['AccountValueMonth']}</p>
                            {tran}
                            <br />
                            {this.state.dane.Time[0]}
                            <br />
                            {this.state.dane.CloseAsk[0]}
                                                        <br />
                            {this.state.dane.Time}
                            <br />
                            {this.state.dane.CloseAsk}
                            <hr />
                            {doubled}
                            <hr />
                            <hr />
                            {this.state.dane.CloseAsk.length}
                        </div>
                    )}
                </div>
                

            </div>
        )
    }
}

export default Home
