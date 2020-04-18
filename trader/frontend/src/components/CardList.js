import React from 'react';
import './Components.css'

import { Card } from 'antd';

const CardList = (props) => {

    const gridStyle = {
        width: '25%',
        textAlign: 'center',
        background: "#dde0e6"
    };

    return (
        <Card title="Account info" >
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
        </Card>
    )
}

export default CardList;