
import { Layout, Menu } from 'antd';

import { RightOutlined, LoginOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaTshirt } from 'react-icons/fa';
import {GoGraph} from 'react-icons/go'
import 'antd/dist/antd.css';


const { Sider, Content, Footer } = Layout;
const {SubMenu} = Menu;

interface SidebarProps {
  screen: ReactNode;
  display: boolean; 
}


export function Sidebar(props:SidebarProps){
  return (
    <>
    {props.display ? (
      <Layout >
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
       
      }}
      onCollapse={(collapsed, type) => {
        
      }}
      style={{height:'100vh'}}
      
    >
    
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} >
      
        <Menu.Item key="dashboard" icon={<GoGraph />}>
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
          <Menu.Item  key="productBrand" icon={<RightOutlined />}>
            
            <Link href='/product/brand'>
              Marcas
            </Link>
            
          </Menu.Item>
          <Menu.Item  key="productCategory" icon={<RightOutlined />}>
            
            <Link href='/product/category'>
              Categoria
            </Link>
            
            
          </Menu.Item>
          <Menu.Item  key="productSubCategory" icon={<RightOutlined />}>
            <Link href='/product/subCategory'>
              SubCategoria
            </Link>
          </Menu.Item>
          <Menu.Item  key="productProvider" icon={<RightOutlined />}>
            <Link href='/product/provider'>
              Fornecedor
            </Link>
          </Menu.Item>
          <Menu.Item  key="productProduct" icon={<RightOutlined />}>
            <Link href='/product'>
              Produto
            </Link>
          </Menu.Item>
        </SubMenu>
       
        <Menu.Item  key="logout" icon={<LoginOutlined />}>
            
          <Link href='/'>
            Sair
          </Link>
            
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout >
     
      <Content style={{ margin: '24px 16px 0' }}>
        <div  style={{ padding: 24, minHeight: 360 }}>
          {props.screen}
        </div>
      </Content>
     
    </Layout>
  </Layout>
  ):(
    <>
    {props.screen}
    </>
  )}
  </>
   
    
  )

} 