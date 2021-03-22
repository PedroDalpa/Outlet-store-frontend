import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';

import { SellContext } from '../../../contexts/sell/SellContext';

import styles from '../../../styles/components/CreateButton.module.css';

export function CreateButton() {
  const { openCreateSellModal } = useContext(SellContext);

  return (
    <button onClick={openCreateSellModal} type="button" className={styles.createButton}>

      <FaPlus className={styles.createButtonIcon} />

      Nova Venda
    </button>
  );
}
