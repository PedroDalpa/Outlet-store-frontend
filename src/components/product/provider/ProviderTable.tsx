
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';
import { ProviderContext } from '../../../contexts/product/ProviderContext';

const columns: ColumnsType<Providers> = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width:'20%'
  },
  {
    key: 'name',
    title: 'Nome',
    dataIndex: 'name',
  },
  {
    key: 'phone',
    title: 'Telefone',
    dataIndex: 'phone',
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
  },
  {
    key: 'created',
    title: 'Criado em:',
    dataIndex: 'create_at',
  },
 
];


interface Providers{
  id:string;
  name:string;
  created: string;
}



export function ProviderTable(){
  const {providers} = useContext(ProviderContext)  
  
  return(
    <Table columns={columns} dataSource={providers} rowKey={'id'} />
  )

}


