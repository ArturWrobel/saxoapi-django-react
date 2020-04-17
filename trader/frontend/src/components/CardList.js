import React from 'react';
//import './Layout.css'

import { Card } from 'antd';

const CardList = (props) => {

    const gridStyle = {
        width: '25%',
        textAlign: 'center',
        background: "lightgrey"
    };

    return (
        <Card title="Account info">
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
                Content
        </Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
        </Card>
    )
}

export default CardList;