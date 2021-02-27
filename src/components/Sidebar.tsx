import { ProSidebar, Menu, MenuItem, SubMenu,SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { useRouter } from 'next/router';

import {FaGem, FaHeart}  from 'react-icons/fa'

import Link from 'next/link';
export function SideBar(props:any){
  const router = useRouter();
  
  function logout(){    
    router.push('/');
  }



  return (
    <ProSidebar style={{height:'100vh', marginTop:'-40px'}} width='250px'>
      

      <Menu iconShape="square">
        <MenuItem icon={<FaGem />}> <Link href='/dashboard'> Dashboard</Link></MenuItem>
        <SubMenu title="Components" icon={<FaHeart />}>
          <MenuItem><Link href='/product/create'>Component 1</Link></MenuItem>
          <MenuItem>Component 2</MenuItem>
        </SubMenu>
        <MenuItem icon={<FaGem />}> <Link href='/'> Sair</Link></MenuItem>
      </Menu>
    </ProSidebar>
    
  )
};