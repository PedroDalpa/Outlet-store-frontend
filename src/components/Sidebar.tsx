import { 
  ProSidebar, Menu, MenuItem, SubMenu,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaGem, FaTshirt}  from 'react-icons/fa'

import Link from 'next/link';
import styles from '../styles/components/SideBar.module.css'
export function SideBar(props:any){
  return (
    <ProSidebar className={styles.container} width='250px'>
      <Menu iconShape="square">
        <MenuItem icon={<FaGem />}><Link href='/dashboard'> Dashboard</Link></MenuItem>
        <SubMenu title="Produto" icon={<FaTshirt />}>
          <MenuItem><Link href='/product/brand'>Marcas</Link></MenuItem>
          <MenuItem>Component 2</MenuItem>
        </SubMenu>
        <MenuItem icon={<FaGem />}> <Link href='/'> Sair</Link></MenuItem>
      </Menu>
    </ProSidebar>    
  )
};