import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';
import { BrandContext } from '../../../contexts/product/BrandContext';

interface Brands{
  id:string;
  name:string;
  created: string;
}

const columns: ColumnsType<Brands> = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width: '30%',
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

export function TableBrand() {
  const { brands } = useContext(BrandContext);

  return (
    <Table columns={columns} dataSource={brands} rowKey="id" />
  );
}
