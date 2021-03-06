
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';
import { SubCategoryContext } from '../../../contexts/product/SubCategoryContext';

const columns: ColumnsType<SubCategorys> = [
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
    key: 'categoryName',
    title: 'Categoria',
    dataIndex: 'categoryName',
  },
  {
    key: 'created',
    title: 'Criado em:',
    dataIndex: 'create_at',
  },
 
];


interface SubCategorys{
  id:string;
  name:string;
  created: string;
}



export function SubCategoryTable(){
  const {subCategorys} = useContext(SubCategoryContext)  
  
  return(
    <Table columns={columns} dataSource={subCategorys} rowKey={'id'} />
  )

}


