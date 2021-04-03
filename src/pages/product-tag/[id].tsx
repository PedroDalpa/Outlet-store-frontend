import BarCode from 'react-barcode';
import { GetServerSideProps } from 'next';
import api from '../../services/api';
import styles from '../../styles/pages/product-tag/Tags.module.css';

interface ITag{
  name:string,
  barCode:string
}
export default function Product({ tags }) {
  return (
    <div className={styles.etiquetas}>
      {tags.map((tag:ITag) => (
        <span>
          <div className={styles.etiqueta}>
            <h1>{tag.name }</h1>

            <BarCode
              value={tag.barCode}
              textPosition="top"
              width={1.2}
              height={28}
              fontSize={12}
              key={tag.barCode}
            />
          </div>
        </span>

      ))}

    </div>

  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  const { id } = context.params;

  try {
    const { data } = await api.get(`product/tag/${id}`, {
      headers:
      { authorization: token },
    });

    return {
      props: {
        tags: data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        tags: 'ocorreu um erro!',
      },
    };
  }
};
