
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';
import { CategoryContext } from '../../../contexts/product/CategoryContext';

const columns: ColumnsType<Categorys> = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width:'30%'
  },
  {
    key: 'name',
    title: 'Nome',
    dataIndex: 'name',
  },
  {
    key: 'created',
    title: 'Criado em:',
    dataIndex: 'create_at',
  },
 
];


interface Categorys{
  id:string;
  name:string;
  created: string;
}



export function CategoryTable(){
  const {categorys} = useContext(CategoryContext) 
  
  return(
    <Table columns={columns} dataSource={categorys} rowKey={'id'} />
  )

}


