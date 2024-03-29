import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';
import { ProductContext } from '../../../contexts/product/ProductContext';

interface Products{
  id:string;
  name:string;
  created: string;
}

const columns: ColumnsType<Products> = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width: '20%',
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

export function ProductTable() {
  const { products } = useContext(ProductContext);

  return (
    <Table columns={columns} dataSource={products} rowKey="id" />
  );
}
