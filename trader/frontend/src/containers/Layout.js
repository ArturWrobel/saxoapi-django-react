import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'

import './Layout.css'

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
    
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu className="menu" theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to = "/">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to = "/chart">Chart</Link></Menu.Item>
                    <Menu.Item key="3">Backend</Menu.Item>
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
            <Footer className="footer">Created by ARW ©2020</Footer>
        </Layout>
    )
}

export default CustomLayout;