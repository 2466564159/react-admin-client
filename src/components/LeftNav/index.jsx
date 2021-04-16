import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu

class LeftNav extends Component {
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        return menuList.map(item => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }else {
                if(item.children.find(cItem => path===cItem.key)) { 
                    this.openKey = item.key 
                }
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    getMenuNodes2 = (menuList) => {
        return menuList.reduce((pre, item) => {
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                ))
            }else {
                pre.push((
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes2(item.children)}
                    </SubMenu>
                ))
            }

            return pre
        },[])
    }

    render() {
        const path = this.props.location.pathname
        const openKey = this.openKey
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>

                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)