/* eslint-disable max-len */
import { useContext, useEffect, useState } from 'react';

import {
  Select,
} from 'antd';
import api from '../../../services/api';

import global from '../../../styles/components/GlobalModal.module.css';

import styles from '../../../styles/components/product/brand/CreateBrandModal.module.css';

import { Notification } from '../../Notification';
import { SubCategoryContext } from '../../../contexts/product/SubCategoryContext';

const { Option } = Select;
const defaultErrorMessage = 'ocorreu um erro ao cadastrar a marca, tente novamente';

export function CreateSubCategoryModal() {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([{
    id: '',
    name: '',
  }]);

  const [productCategory, setProductCategory] = useState(null);

  const { closeCreateSubCategoryModal, subCategorys } = useContext(SubCategoryContext);

  async function createSubCategory() {
    try {
      const response = await api.post('/product/sub/category', { name, productCategory });
      Notification({
        type: 'success',
        title: 'Marca cadastrada com sucesso',
        description: 'sucesso ao cadastrar marca',

      });
      closeCreateSubCategoryModal();

      subCategorys.push(response.data);
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

  useEffect(() => {
    api.get('/product/category', {})
      .then((response) => {
        setCategories(response.data);
      });
  }, []);

  return (
    <div className={global.overlay}>
      <div className={global.container}>
        <header>
          Criar SubCategoria
        </header>
        <hr />
        <form className={styles.form}>

          <div className={styles.inputs}>
            <p>
              <label>Nome:</label>

              <input
                placeholder="Nome da subcategoria"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
                <label>Nome:</label>
                <Select
                  showSearch
                  placeholder="Selecione"
                  size="large"
                  onChange={(e) => { setProductCategory(e); }}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                >

                  {categories.map((option) => (
                    <>
                      <Option key={option.id} value={option.id}>
                        {option.name}
                      </Option>
                    </>
                  ))}
                </Select>
              </div>

            </p>
          </div>
          <hr />
          <footer>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={closeCreateSubCategoryModal}
            >
              cancelar
            </button>
            <button
              type="button"
              className={styles.createButton}
              onClick={createSubCategory}
            >
              Cadastrar
            </button>
          </footer>

        </form>
        <button
          type="button"
          onClick={closeCreateSubCategoryModal}
        >
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
    </div>
  );
}
