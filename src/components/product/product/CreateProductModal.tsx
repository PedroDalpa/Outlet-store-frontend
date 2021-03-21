/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable max-len */
import { useContext, useEffect, useState } from 'react';

import {
  Button,
  Divider,
  Row,
  Select,
  Form,
  Col,
} from 'antd';
import {

  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import api from '../../../services/api';

import global from '../../../styles/components/GlobalModal.module.css';

import styles from '../../../styles/components/product/CreateProductModal.module.css';

import { Notification } from '../../Notification';
import { ProductContext } from '../../../contexts/product/ProductContext';

const { Option } = Select;
const defaultErrorMessage = 'ocorreu um erro ao cadastrar a produto, tente novamente';

export function CreateProductModal() {
  const [name, setName] = useState('');

  const { closeCreateProductModal } = useContext(ProductContext);
  const [productProviders, setProductProviders] = useState([
    { productProvider: '' },
  ]);
  const [productBrandId, setProductBrandId] = useState(null);
  const [productSubCategoryId, setProductSubCategoryId] = useState(null);

  async function createProduct() {
    try {
      const response = await api.post('/product', {
        name,
        productProviders,
        productBrandId,
        productSubCategoryId,
      });
      Notification({
        type: 'success',
        title: 'Produto adicionado com sucesso',
        description: 'sucesso ao cadastrar marca',

      });
      closeCreateProductModal();
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

  const [subCategories, setSubCategories] = useState([{
    id: '',
    name: '',
  }]);
  const [brands, setBrands] = useState([{
    id: '',
    name: '',
  }]);
  const [providers, setProviders] = useState([{
    id: '',
    name: '',
  }]);

  useEffect(() => {
    api.get('/product/sub/category', {})
      .then((response) => {
        setSubCategories(response.data);
      });
    api.get('/product/brand', {})
      .then((response) => {
        setBrands(response.data);
      });
    api.get('/product/provider', {})
      .then((response) => {
        setProviders(response.data);
      });
  }, []);

  const handleAddClick = (e, index) => {
    e.preventDefault();

    setProductProviders([
      ...productProviders,
      {
        productProvider: '',
      },
    ]);
  };

  const handleRemoveClick = (index) => {
    const list = [...productProviders];

    list.splice(index, 1);
    setProductProviders(list);
  };

  function HandleChange(e, index) {
    const NewArray = [...productProviders];

    NewArray[index].productProvider = e;

    setProductProviders(NewArray);
  }

  return (
    <div className={global.overlay}>
      <div className={global.container}>
        <header>
          Cadastrar produto
        </header>
        <hr />
        <form className={styles.form}>

          <div className={styles.inputs}>
            <p>
              <label>Nome:</label>

              <input
                placeholder="Nome do produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
                <label>Marca do produto:</label>
                <Select
                  showSearch
                  placeholder="Selecione"
                  size="large"
                  onChange={(e) => {
                    setProductBrandId(e);
                  }}

                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                >

                  {brands.map((option) => (
                    <>
                      <Option key={option.id} value={option.id}>
                        {option.name}
                      </Option>
                    </>
                  ))}
                </Select>
              </div>

            </p>
            <p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', width: '95%' }}>
                <label>SubCategoria:</label>
                <Select
                  showSearch
                  placeholder="Selecione"
                  size="large"
                  onChange={(e) => {
                    setProductSubCategoryId(e);
                  }}

                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                >

                  {subCategories.map((option) => (
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
          <Divider />
          {productProviders.map((selectedProvider, index) => (
            <>
              <Row>

                <Col span={24}>
                  <Form.Item
                    labelCol={{ span: 23 }}
                    label="Fornecedor:"
                    labelAlign="left"
                  >
                    <Select
                      showSearch
                      placeholder="Selecione"
                      size="large"
                      onChange={(e) => { HandleChange(e, index); }}
                      value={selectedProvider.productProvider}

                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      // eslint-disable-next-line max-len
                      filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                      style={{ width: '95%', marginRight: '1rem' }}
                    >

                      {providers.map((option) => (
                        <>
                          <Option key={option.id} value={option.id}>
                            {option.name}
                          </Option>
                        </>
                      ))}
                    </Select>
                    {productProviders.length !== 1 && (
                      <MinusCircleOutlined
                        onClick={() => handleRemoveClick(index)}
                        style={{ height: '1px' }}
                      />
                    )}
                  </Form.Item>
                </Col>

                {productProviders.length - 1 === index && (
                  <Button
                    key="primary"
                    title="Nova Linha"
                    style={{ width: '100%' }}
                    onClick={(e) => handleAddClick(e, index)}
                  >
                    <PlusOutlined />
                    Subproduto
                  </Button>
                )}
                <Divider />
              </Row>
            </>
          ))}

          <hr />
          <footer>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={closeCreateProductModal}
            >
              cancelar
            </button>
            <button
              type="button"
              className={styles.createButton}
              onClick={createProduct}
            >
              Cadastrar
            </button>
          </footer>

        </form>
        <button
          type="button"
          onClick={closeCreateProductModal}
        >
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
    </div>
  );
}
