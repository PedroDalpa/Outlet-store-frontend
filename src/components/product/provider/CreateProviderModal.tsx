import { useContext, useEffect, useState } from 'react';

import {
  Select,
} from 'antd';
import api from '../../../services/api';

import global from '../../../styles/components/GlobalModal.module.css';

import styles from '../../../styles/components/product/brand/CreateBrandModal.module.css';

import { Notification } from '../../Notification';
import { ProviderContext } from '../../../contexts/product/ProviderContext';

const { Option } = Select;
const defaultErrorMessage = 'ocorreu um erro ao cadastrar a marca, tente novamente';

export function CreateProviderModal() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const { closeCreateProviderModal, providers } = useContext(ProviderContext);

  async function createProvider() {
    try {
      const response = await api.post('/product/provider', { name, phone, email });
      Notification({
        type: 'success',
        title: 'Fornecedor adicionado com sucesso',
        description: 'sucesso ao cadastrar marca',

      });
      closeCreateProviderModal();
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
          adicionar fornecedor
        </header>
        <hr />
        <form className={styles.form}>

          <div className={styles.inputs}>
            <p>
              <label>Nome:</label>

              <input
                placeholder="Nome do fornecedor"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <p>
              <label>Telefone:</label>

              <input
                placeholder="Telefone do fornecedor"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </p>
            <p>
              <label>Email:</label>

              <input
                placeholder="Email do fornecedor"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>

          </div>
          <hr />
          <footer>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={closeCreateProviderModal}
            >
              cancelar
            </button>
            <button
              type="button"
              className={styles.createButton}
              onClick={createProvider}
            >
              Cadastrar
            </button>
          </footer>

        </form>
        <button
          type="button"
          onClick={closeCreateProviderModal}
        >
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
    </div>
  );
}
