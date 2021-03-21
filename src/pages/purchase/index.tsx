import { GetServerSideProps } from 'next';
import styles from '../../styles/pages/product/Brand.module.css';

import { CreateButton } from '../../components/purchase/purchase/CreateButton';
import api from '../../services/api';

import { PurchaseProvider } from '../../contexts/purchase/PurchaseContext';
import { PurchaseTable } from '../../components/purchase/purchase/PurchaseTable';

interface Product {
  id:string;
  name:string;
  created: string;
}

interface IPurchaseTable{
  itens: Product[]
}

export default function Product({ itens }:IPurchaseTable) {
  return (

    <PurchaseProvider itens={itens}>
      <div className={styles.container}>

        <CreateButton />

        <div className={styles.table}>
          <PurchaseTable />
        </div>

      </div>
    </PurchaseProvider>

  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  try {
    const { data } = await api.get('product/purchase', {
      headers:
      { authorization: token },
    });

    return {
      props: {
        itens: data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {

      },
    };
  }
};
