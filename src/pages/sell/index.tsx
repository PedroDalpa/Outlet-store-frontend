import { GetServerSideProps } from 'next';
import styles from '../../styles/pages/product/Brand.module.css';

import { CreateButton } from '../../components/sell/sell/CreateButton';
import api from '../../services/api';

import { SellProvider } from '../../contexts/sell/SellContext';
import { SellTable } from '../../components/sell/sell/SellTable';

interface Product {
  id:string;
  name:string;
  created: string;
}

interface ISellTable{
  itens: Product[]
}

export default function Sell({ itens }:ISellTable) {
  return (

    <SellProvider itens={itens}>
      <div className={styles.container}>

        <CreateButton />

        <div className={styles.table}>
          <SellTable />
        </div>

      </div>
    </SellProvider>

  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  try {
    const { data } = await api.get('product/sell', {
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
