import { GetServerSideProps } from 'next';
import styles from '../../styles/pages/product/Brand.module.css';

import { CreateButton } from '../../components/product/product/CreateButton';
import api from '../../services/api';

import { ProductProvider } from '../../contexts/product/ProductContext';
import { ProductTable } from '../../components/product/product/ProductTable';

interface Product {
  id:string;
  name:string;
  created: string;
}

interface IProductTable{
  itens: Product[]
}

export default function Product({ itens }:IProductTable) {
  return (

    <ProductProvider itens={itens}>
      <div className={styles.container}>

        <CreateButton />

        <div className={styles.table}>
          <ProductTable />
        </div>

      </div>
    </ProductProvider>

  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  try {
    const { data } = await api.get('product', {
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
