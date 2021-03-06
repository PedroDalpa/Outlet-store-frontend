
import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';

import { SubCategoryContext } from '../../../contexts/product/SubCategoryContext';

import styles from '../../../styles/components/CreateButton.module.css'

export function CreateButton(){
  const {openCreateSubCategoryModal} = useContext(SubCategoryContext);

  return(
    <button onClick={openCreateSubCategoryModal} className={styles.createButton}>
      
      <FaPlus className={styles.createButtonIcon}/> 

      Nova SubCategoria
    </button>
  )

}