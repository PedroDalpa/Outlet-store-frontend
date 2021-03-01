
import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { BrandContext } from '../../../contexts/product/BrandContext';

import styles from '../../../styles/components/CreateButton.module.css'

export function CreateButton(){
  const {openCreateBrandModal} = useContext(BrandContext);

  return(
    <button onClick={openCreateBrandModal} className={styles.createButton}>
      
      <FaPlus className={styles.createButtonIcon}/> 

      Nova marca
    </button>
  )

}