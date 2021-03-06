
import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';

import { ProductContext } from '../../../contexts/product/ProductContext';

import styles from '../../../styles/components/CreateButton.module.css'

export function CreateButton(){
  const {openCreateProductModal} = useContext(ProductContext);

  return(
    <button onClick={openCreateProductModal} className={styles.createButton}>
      
      <FaPlus className={styles.createButtonIcon}/> 

      Novo Produto
    </button>
  )

}