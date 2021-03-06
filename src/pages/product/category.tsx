import styles from '../../styles/pages/product/Brand.module.css';



import { CreateButton } from "../../components/product/category/CreateButton";
import { GetServerSideProps } from "next";
import api from "../../services/api";

import { CategoryProvider } from '../../contexts/product/CategoryContext';
import { CategoryTable } from '../../components/product/category/TableCategory'



interface Categorys {
  id:string;
  name:string;
  created: string;
}

interface CategoryTable{
  itens: Categorys[]
}



export default function Category(props:CategoryTable) {
 
  return (
   
    <CategoryProvider itens={props.itens} >
      <div className={styles.container} >
        
        <CreateButton />
           
        <div className={styles.table}>
          <CategoryTable />
        </div>
        
      </div>
    </CategoryProvider>
    
   
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const {token} = context.req.cookies;
  
  try {
    const {data} = await api.get('product/category', { headers: 
      { authorization: token }
    });
        
    return {
      props: {
        itens: data
      }
    }
    

  } catch (error) {
    console.error(error);
    return {
      props: {
        itens: [{id:'',name:'', created:''}]
      }
    };
    
    
  }
}
