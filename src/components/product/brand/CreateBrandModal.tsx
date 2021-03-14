import { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { BrandContext } from '../../../contexts/product/BrandContext';
import api from '../../../services/api';

import global from '../../../styles/components/GlobalModal.module.css';

import styles from '../../../styles/components/product/brand/CreateBrandModal.module.css';

import { Notification } from '../../Notification';

const defaultErrorMessage = 'ocorreu um erro ao cadastrar a marca, tente novamente';
const token = Cookies.get('token');
export function CreateBrandModal() {
  const [name, setName] = useState('');

  const { closeCreateBrandModal, brands } = useContext(BrandContext);

  async function createBrand() {
    try {
      const response = await api.post('/product/brand', { name }, {
        headers:
        { authorization: token },
      });
      Notification({
        type: 'success',
        title: 'Marca cadastrada com sucesso',
        description: 'sucesso ao cadastrar marca',

      });
      closeCreateBrandModal();

      brands.push(response.data);
    } catch (error) {
      const response = error.response.data.message;
      const message = response === undefined ? defaultErrorMessage : response;
      Notification({
        type: 'error',
        description: message,
        title: 'Erro ao cadastrar uma marca',
      });
    }
  }

  return (
    <div className={global.overlay}>
      <div className={global.container}>
        <header>
          Criar Marca
        </header>
        <hr />
        <form className={styles.form}>

          <div className={styles.inputs}>
            <p>
              <label>Nome:</label>

              <input
                placeholder="Nome da marca"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </p>
          </div>
          <hr />
          <footer>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={closeCreateBrandModal}
            >
              cancelar
            </button>
            <button
              type="button"
              className={styles.createButton}
              onClick={createBrand}
            >
              Cadastrar
            </button>
          </footer>

        </form>
        <button
          type="button"
          onClick={closeCreateBrandModal}
        >
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
    </div>
  );
}
