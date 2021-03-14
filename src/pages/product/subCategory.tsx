import { GetServerSideProps } from 'next';
import styles from '../../styles/pages/product/Brand.module.css';

import { CreateButton } from '../../components/product/subcategory/CreateButton';
import api from '../../services/api';

import { SubCategoryProvider } from '../../contexts/product/SubCategoryContext';
import { SubCategoryTable } from '../../components/product/subcategory/SubCategoryTable';

interface SubCategory {
  id:string;
  name:string;
  created: string;
}

interface ISubCategoryTable{
  itens: SubCategory[]
}

export default function SubCategory({ itens }:ISubCategoryTable) {
  return (

    <SubCategoryProvider itens={itens}>
      <div className={styles.container}>

        <CreateButton />

        <div className={styles.table}>
          <SubCategoryTable />
        </div>

      </div>
    </SubCategoryProvider>

  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  try {
    const { data } = await api.get('product/sub/category', {
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
        itens: [{ id: '', name: '', created: '' }],
      },
    };
  }
};
