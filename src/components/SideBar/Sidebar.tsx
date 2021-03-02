
import { Layout, Menu } from 'antd';

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaTshirt } from 'react-icons/fa';


const { Sider, Content, Footer } = Layout;
const {SubMenu} = Menu;

interface SidebarProps {
  screen: ReactNode;
  display: '' | 'none'; 
}


export function Sidebar(props:SidebarProps){
  return (
    
      <Layout >
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{height:'100vh', display:`${props.display}`}}
    >
    
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
      
        <Menu.Item key="dashboard" icon={<VideoCameraOutlined />}>
          <Link href='/dashboard'>
            dashboard
          </Link>
        </Menu.Item>
        <SubMenu
          key="product"
          title="Produto"
          icon={
            <span className="anticon anticon-bank">
              <FaTshirt  size={16} color="#808a94" />
            </span>
         }
        >
          <Menu.Item  key="productBrand" icon={<UserOutlined />}>
            
            <Link href='/product/brand'>
              Marcas
            </Link>
            
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          nav 4
        </Menu.Item>
        <Menu.Item  key="logout" icon={<UserOutlined />}>
            
          <Link href='/'>
            Sair
          </Link>
            
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
     
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {props.screen}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
   
    
  )

} 