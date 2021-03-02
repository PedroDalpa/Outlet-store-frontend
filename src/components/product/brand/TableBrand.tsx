
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';
import { BrandContext } from '../../../contexts/product/BrandContext';

const columns: ColumnsType<Brands> = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
  },
  {
    key: 'name',
    title: 'Nome',
    dataIndex: 'name',
  },
  {
    key: 'created',
    title: 'Criado em:',
    dataIndex: 'created',
  },
 
];


interface Brands{
  id:string;
  name:string;
  created: string;
}



export function TableBrand(){
  const {brands} = useContext(BrandContext)
  
  return(
    <Table columns={columns} dataSource={brands} rowKey={'id'} />
  )

}


