import { GetServerSideProps } from 'next';
import styles from '../../styles/pages/product/Brand.module.css';

import { CreateButton } from '../../components/product/provider/CreateButton';
import api from '../../services/api';

import { ProviderProvider } from '../../contexts/product/ProviderContext';
import { ProviderTable } from '../../components/product/provider/ProviderTable';

interface Provider {
  id:string;
  name:string;
  created: string;
}

interface IProviderTable{
  itens: Provider[]
}

export default function Provider({ itens }:IProviderTable) {
  return (

    <ProviderProvider itens={itens}>
      <div className={styles.container}>

        <CreateButton />

        <div className={styles.table}>
          <ProviderTable />
        </div>

      </div>
    </ProviderProvider>

  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  try {
    const { data } = await api.get('product/provider', {
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
