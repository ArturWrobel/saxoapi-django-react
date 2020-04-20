import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'

import './Layout.css'

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
    let date = new Date().toLocaleString()
    
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu className="menu top" theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to = "/">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to = "/currencies">Currencies</Link></Menu.Item>
                    <Menu.Item key="3"><Link to = "/options">Options</Link></Menu.Item>
                </Menu>
            </Header>
            <Content className = "content">
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to = "/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to = "/chart">Chart</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Backend</Breadcrumb.Item>
                </Breadcrumb> */}
                <div className="site-layout-content">
                    {props.children}
                </div>
            </Content>
            <Footer className="footer"> <div className = "container"> <div>{"Time: " + date}</div> <div>Created by ARW ©2020</div> </div>  </Footer>
        </Layout>
    )
}

export default CustomLayout;