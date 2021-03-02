import styles from '../../styles/pages/product/Brand.module.css';


import {  BrandProvider } from '../../contexts/product/BrandContext';
import { CreateButton } from "../../components/product/brand/CreateButton";
import { GetServerSideProps } from "next";
import api from "../../services/api";
import { TableBrand } from "../../components/product/brand/TableBrand";



interface Brands {
  id:string;
  name:string;
  created: string;
}

interface BrandTable{
  itens: Brands[]
}



export default function Brands(props:BrandTable) {
 
   
    
  return (
   
    <BrandProvider itens={props.itens} >
      <div className={styles.container} >
        
        <CreateButton />
           
        <div className={styles.table}>
          <TableBrand />
        </div>
        
      </div>
    </BrandProvider>
    
   
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {token} = context.req.cookies
  
  
  
  try {
    const {data} = await api.get('product/brand', { headers: 
      { authorization: token }
    });
   
    
   
    return {
      props: {
        itens: data
      }
    }
    

  } catch (error) {
    // console.error(error);
    return {
      props: {
        itens: [{id:'',name:'', created:''}]
      }
    };
    
    
  }
}
