import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';
import { PurchaseContext } from '../../../contexts/purchase/PurchaseContext';

interface Purchases{
  id:string;
  name:string;
  created: string;
}

const columns: ColumnsType<Purchases> = [
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

export function PurchaseTable() {
  const { purchase } = useContext(PurchaseContext);

  return (
    <Table columns={columns} dataSource={purchase} rowKey="id" />
  );
}
