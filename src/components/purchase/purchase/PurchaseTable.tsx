import { BarcodeOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
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
  {
    title: 'Operação',
    dataIndex: 'operacao',
    align: 'center',

    render: (text, record) => (
      <>

        <a target="_blank" href={`/product-tag/${record.id}`} style={{ textDecoration: 'none', color: 'black' }} rel="noopener noreferrer">
          <BarcodeOutlined style={{ marginLeft: 20 }} />
        </a>

      </>
    ),
  },

];

export function PurchaseTable() {
  const { purchase } = useContext(PurchaseContext);

  return (
    <Table columns={columns} dataSource={purchase} rowKey="id" />
  );
}
