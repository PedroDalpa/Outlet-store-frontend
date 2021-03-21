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
  Input,
} from 'antd';
import {

  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import api from '../../../services/api';

import global from '../../../styles/components/GlobalModal.module.css';

import styles from '../../../styles/components/product/CreateProductModal.module.css';

import { Notification } from '../../Notification';
import { PurchaseContext } from '../../../contexts/purchase/PurchaseContext';

const { Option } = Select;
const defaultErrorMessage = 'ocorreu um erro ao cadastrar a Compra, tente novamente';

export function CreatePurchaseModal() {
  const [fiscalNote, setFiscalNote] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [products, setProducts] = useState([{
    id: '',
    name: '',
  }]);

  const { closeCreatePurchaseModal } = useContext(PurchaseContext);
  const [productsPurchase, setProductProviders] = useState([
    {
      product: '', productProvider: '', amount: '', totalValue: '', unitValue: 0,
    },
  ]);

  async function createProduct() {
    try {
      const response = await api.post('/product/purchase', {
        fiscalNote,
        totalValue,
        products: productsPurchase,
      });
      Notification({
        type: 'success',
        title: 'Compra adicionada com sucesso',
        description: 'sucesso ao cadastrar compra',

      });
      closeCreatePurchaseModal();
    } catch (error) {
      const response = error.response.data.message;
      const message = response === undefined ? defaultErrorMessage : response;
      Notification({
        type: 'error',
        description: message,
        title: 'Erro ao cadastrar uma compra',
      });
    }
  }

  const [providers, setProviders] = useState([{
    id: '',
    name: '',
  }]);

  useEffect(() => {
    api.get('/product', {})
      .then((response) => {
        setProducts(response.data);
      });
  }, []);

  const handleAddClick = (e, index) => {
    e.preventDefault();

    setProductProviders([
      ...productsPurchase,
      {
        product: '',
        productProvider: '',
        amount: '',
        totalValue: '',
        unitValue: 0,
      },
    ]);
  };

  const handleRemoveClick = (index) => {
    const list = [...productsPurchase];

    list.splice(index, 1);
    setProductProviders(list);
  };

  function HandleChangeProvider(e, index) {
    const NewArray = [...productsPurchase];

    NewArray[index].productProvider = e;

    setProductProviders(NewArray);
  }

  function HandleChange(e, index) {
    // e.preventDefault();
    const { name, value } = e.target;

    const NewArray = [...productsPurchase];

    NewArray[index][name] = value;
    if (name === 'totalValue') {
      NewArray[index].unitValue = parseFloat(value) / parseFloat(NewArray[index].amount);
    }

    setProductProviders(NewArray);
  }

  async function HandleChangeProduct(e, index) {
    const NewArray = [...productsPurchase];

    NewArray[index].product = e;

    const response = await api.get(`product/${e}/provider`);
    setProviders(response.data);

    setProductProviders(NewArray);
  }

  return (
    <div className={global.overlay}>
      <div className={global.container}>
        <header>
          Cadastrar compra
        </header>
        <hr />
        <form className={styles.form}>

          <div className={styles.inputs}>
            <p>
              <label>Número da nota:</label>

              <input
                placeholder="Numero da nota"
                value={fiscalNote}
                onChange={(e) => setFiscalNote(e.target.value)}
              />
            </p>
            <p>
              <label>Valor total da nota:</label>

              <input
                placeholder="valor total da nota"
                value={totalValue}
                onChange={(e) => setTotalValue(e.target.value)}
                type="number"
              />
            </p>

          </div>
          <Divider />
          {productsPurchase.map((selectedProvider, index) => (
            <>
              <Row gutter={5}>

                <Col span={12}>
                  <Form.Item
                    labelCol={{ span: 23 }}
                    label="Produto:"
                    labelAlign="left"
                  >
                    <Select
                      showSearch
                      placeholder="Selecione"
                      size="large"
                      onChange={(e) => { HandleChangeProduct(e, index); }}
                      value={selectedProvider.product}

                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      // eslint-disable-next-line max-len
                      filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                    >

                      {products.map((option) => (
                        <>
                          <Option key={option.id} value={option.id}>
                            {option.name}
                          </Option>
                        </>
                      ))}
                    </Select>

                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    labelCol={{ span: 23 }}
                    label="Fornecedor:"
                    labelAlign="left"
                  >
                    <Select
                      showSearch
                      placeholder="Selecione"
                      size="large"
                      onChange={(e) => { HandleChangeProvider(e, index); }}
                      value={selectedProvider.productProvider}

                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      // eslint-disable-next-line max-len
                      filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                    >

                      {providers.map((option) => (
                        <>
                          <Option key={option.id} value={option.id}>
                            {option.name}
                          </Option>
                        </>
                      ))}
                    </Select>

                  </Form.Item>
                </Col>

              </Row>
              <Row gutter={5}>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 23 }}
                    label="Quantidade:"
                    labelAlign="left"
                  >
                    <Input
                      name="amount"
                      placeholder="quantidade"
                      type="number"
                      value={selectedProvider.amount}
                      onChange={(e) => {
                        e.preventDefault();

                        HandleChange(e, index);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 23 }}
                    label="Valor de total das peças:"
                    labelAlign="left"

                  >
                    <Input
                      name="totalValue"
                      placeholder="quantidade"
                      type="number"
                      value={selectedProvider.totalValue}
                      onChange={(e) => {
                        e.preventDefault();
                        HandleChange(e, index);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 23 }}
                    label="Valor unitário:"
                    labelAlign="left"

                  >
                    <Input
                      name="unitValue"
                      placeholder="quantidade"
                      type="number"
                      value={selectedProvider.unitValue}
                      disabled
                      style={{ width: '90%', marginRight: '0.7rem' }}
                    />
                    {productsPurchase.length !== 1 && (
                      <MinusCircleOutlined
                        onClick={() => handleRemoveClick(index)}
                        style={{ height: '1px' }}
                      />
                    )}

                  </Form.Item>
                </Col>
              </Row>

              {productsPurchase.length - 1 === index && (
              <Button
                key="primary"
                title="Mais produtos"
                style={{ width: '100%' }}
                onClick={(e) => handleAddClick(e, index)}
              >
                <PlusOutlined />
                produto
              </Button>
              )}
              <Divider />
            </>
          ))}

          <hr />
          <footer>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={closeCreatePurchaseModal}
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
          onClick={closeCreatePurchaseModal}
        >
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
    </div>
  );
}
