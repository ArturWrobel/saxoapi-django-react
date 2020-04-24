import React from 'react'
import { List } from 'antd';

export default function Strikes(props) {

    const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );

    return (
        <div>
            <List 
            bordered
            dataSource = {listItems}
            renderItem ={item => <List.Item>{item}</List.Item>}
            />
        </div>
    )
}
