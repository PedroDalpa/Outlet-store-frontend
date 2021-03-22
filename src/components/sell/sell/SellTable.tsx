import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';
import { SellContext } from '../../../contexts/sell/SellContext';

interface Sells{
  id:string;
  name:string;
  created: string;
}

const columns: ColumnsType<Sells> = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width: '20%',
  },
  {
    key: 'fiscalNote',
    title: 'Nota fiscal',
    dataIndex: 'fiscalNote',
  },
  {
    key: 'totalValue',
    title: 'Valor total',
    dataIndex: 'totalValue',
  },
  {
    key: 'createAt',
    title: 'Criado em:',
    dataIndex: 'createAt',
  },

];

export function SellTable() {
  const { sell } = useContext(SellContext);

  return (
    <Table columns={columns} dataSource={sell} rowKey="id" />
  );
}
