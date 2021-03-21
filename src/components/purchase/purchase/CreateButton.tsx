import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';

import { PurchaseContext } from '../../../contexts/purchase/PurchaseContext';

import styles from '../../../styles/components/CreateButton.module.css';

export function CreateButton() {
  const { openCreatePurchaseModal } = useContext(PurchaseContext);

  return (
    <button onClick={openCreatePurchaseModal} type="button" className={styles.createButton}>

      <FaPlus className={styles.createButtonIcon} />

      Nova Compra
    </button>
  );
}
