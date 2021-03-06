
import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';

import { ProviderContext } from '../../../contexts/product/ProviderContext';

import styles from '../../../styles/components/CreateButton.module.css'

export function CreateButton(){
  const {openCreateProviderModal} = useContext(ProviderContext);

  return(
    <button onClick={openCreateProviderModal} className={styles.createButton}>
      
      <FaPlus className={styles.createButtonIcon}/> 

      Novo Fornecedor
    </button>
  )

}