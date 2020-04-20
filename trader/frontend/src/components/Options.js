import React, { Component } from 'react'
import axios from 'axios'

export class Options extends Component {
    state = {
        name: "MMM"
    }

    componentDidMount() {

        axios.get(`http://127.0.0.1:8000/api/sp500/`).then(res => {
            this.setState({ name: res.data });
            console.log(res.data)
        })
    }

    render() {
        return (
            <div>
                {this.state.name[0]}
            </div>
        )
    }
}

export default Options
