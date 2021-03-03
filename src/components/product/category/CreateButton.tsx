
import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';

import { CategoryContext } from '../../../contexts/product/CategoryContext';

import styles from '../../../styles/components/CreateButton.module.css'

export function CreateButton(){
  const {openCreateCategoryModal} = useContext(CategoryContext);

  return(
    <button onClick={openCreateCategoryModal} className={styles.createButton}>
      
      <FaPlus className={styles.createButtonIcon}/> 

      Nova Categoria
    </button>
  )

}