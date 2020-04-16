import React, { Component } from 'react'
import axios from 'axios'
import ApexChart from './ApexChart'

export class FetchData extends Component {

    state = {
        loading: true,
        dane: null,
        numbers: [1, 2, 3, 4, 5]     
    }

    async componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/chart/data/").then(res => {
            this.setState({ dane: res.data, loading: false });
            console.log(res.data.CloseAsk[0]);
        })
    }
    
    /* buildArrays() {
    const series = [];
    series.push(this.state.numbers.map(x => x*2))
    console.log(series)
    return series
} */

    render() {
        const doubled = this.state.numbers.map(number => number * 2 + " ");

        let tran = Array(this.state.numbers.map(x => x*5))

        
        return (
            <div>
                <div>
                {this.state.loading || !this.state.dane ? (
                    <div>Loading...</div>
                ) : (
                        <div>
                            {tran}
                            <br />
                            {this.state.dane.Time[0]}
                            <br />
                            {this.state.dane.CloseBid[0]}
                            <br/>
                            {this.state.dane.CloseBid.map((bid, i) => <li key ={i}>{bid}</li>)}
                            <br />
                            {this.state.dane.Time}
                            <br />
                            {this.state.dane.CloseBid}
                            <hr />
                            {doubled}
                            <hr />
                            {this.state.dane.CloseAsk.map((item, index) =><div key ={index}>{item}</div>)}
                            <hr />
                            {this.state.dane.CloseBid.length}
                        </div>
                    )}
                </div>
                <ApexChart/>


            </div>
        )
    }
}

export default FetchData
