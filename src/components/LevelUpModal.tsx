import { useContext } from 'react';
import { SideBarContext } from '../contexts/SideBarContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal(){
  const {closeLevelUpModal} = useContext(SideBarContext);
  return(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>
          
        </header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo nível.</p>
        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar Modal"/>
        </button>
      </div>
    </div>
  )
}