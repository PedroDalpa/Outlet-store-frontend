/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable max-len */
import { useContext, useEffect, useState } from 'react';
import BarcodeReader from 'react-barcode-reader';

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
  SearchOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import api from '../../../services/api';

import global from '../../../styles/components/GlobalModal.module.css';

import styles from '../../../styles/components/product/CreateProductModal.module.css';

import { Notification } from '../../Notification';
import { SellContext } from '../../../contexts/sell/SellContext';

const { Option } = Select;
const defaultErrorMessage = 'ocorreu um erro ao cadastrar a Compra, tente novamente';

export function CreateSellModal() {
  const [fiscalNote, setFiscalNote] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [load, setLoad] = useState(false);

  const { closeCreateSellModal } = useContext(SellContext);
  const [productsSell, setSell] = useState([
    {
      productName: '', value: 0, barCode: '',
    },
  ]);

  async function createProduct() {
    try {
      const response = await api.post('/product/sell', {
        fiscalNote,
        totalValue,
        products: productsSell,
      });
      Notification({
        type: 'success',
        title: 'Compra adicionada com sucesso',
        description: 'sucesso ao cadastrar compra',

      });
      closeCreateSellModal();
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

  const handleAddClick = (e) => {
    e.preventDefault();

    setSell([
      ...productsSell,
      {
        productName: '',
        value: 0,
        barCode: '',
      },
    ]);
  };

  const handleRemoveClick = (index:number) => {
    const list = [...productsSell];

    list.splice(index, 1);
    setSell(list);
  };

  function HandleChange(e, index) {
    e.preventDefault();

    const { name, value } = e.target;
    console.log(name, value);

    const NewArray = [...productsSell];

    NewArray[index][name] = value;

    setSell(NewArray);
  }

  async function HandleChangeProduct(e, index) {
    const NewArray = [...productsSell];

    NewArray[index].productName = e;

    setSell(NewArray);
  }

  const handleError = async (err:string) => {
    setLoad(true);
    const WHERE_IS_READE_BAR_CODE = productsSell.length - 1;
    productsSell[WHERE_IS_READE_BAR_CODE].barCode = err;

    const response = await api.get(`product/bar-code/${err}`);

    const NewArray = [...productsSell];

    NewArray[WHERE_IS_READE_BAR_CODE].productName = response.data.productName;

    setSell(NewArray);
    setLoad(false);
  };

  async function handleSearch(index:number) {
    const response = await api.get(`product/bar-code/${productsSell[index].barCode}`);

    const NewArray = [...productsSell];

    NewArray[index].productName = response.data.productName;

    setSell(NewArray);
  }

  const handleScan = async (data:string) => {
    setLoad(true);
    const WHERE_IS_READE_BAR_CODE = productsSell.length - 1;
    productsSell[WHERE_IS_READE_BAR_CODE].barCode = data;

    const response = await api.get(`product/bar-code/${data}`);

    const NewArray = [...productsSell];

    NewArray[WHERE_IS_READE_BAR_CODE].productName = response.data.productName;

    setSell(NewArray);
    setLoad(false);
  };
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
          {productsSell.map((selectedProduct, index:number) => (
            <>
              <Row gutter={5}>
                <Col span={8}>
                  <Form.Item
                    labelCol={{ span: 23 }}
                    label="Codigo de barras:"
                    labelAlign="left"
                  >
                    <Input
                      name="barCode"
                      placeholder="Código de barras"
                      type="text"
                      value={selectedProduct.barCode}
                      onChange={(e) => { HandleChange(e, index); }}
                    />

                  </Form.Item>

                </Col>
                <Col
                  span={4}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <SearchOutlined
                    style={{
                      fontSize: 18,
                      color: '#3b4357',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSearch(index);
                    }}
                  />
                </Col>
                <Col style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                  <h1>
                    Ou escanei o código com o leitor
                    {' '}
                    {load && <LoadingOutlined />}

                  </h1>
                </Col>
              </Row>
              <Row gutter={5}>

                <Col span={16}>
                  <Form.Item
                    labelCol={{ span: 23 }}
                    label="Produto:"
                    labelAlign="left"
                  >
                    <Input

                      placeholder="Produto"
                      disabled
                      value={selectedProduct.productName}
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
                      name="value"
                      placeholder="quantidade"
                      type="number"
                      value={selectedProduct.value}
                      onChange={(e) => { HandleChange(e, index); }}
                      style={{ width: '90%', marginRight: '0.7rem' }}
                    />
                    {productsSell.length !== 1 && (
                      <MinusCircleOutlined
                        onClick={() => handleRemoveClick(index)}
                        style={{ height: '1px' }}
                      />
                    )}

                  </Form.Item>
                </Col>
              </Row>

              {productsSell.length - 1 === index && (
              <Button
                key="primary"
                title="Mais produtos"
                style={{ width: '100%' }}
                onClick={(e) => handleAddClick(e)}
              >
                <PlusOutlined />
                produto
              </Button>
              )}
              <Divider />
              <BarcodeReader
                onError={handleError}
                onScan={handleScan}
              />
            </>
          ))}

          <hr />
          <footer>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={closeCreateSellModal}
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
          onClick={closeCreateSellModal}
        >
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
    </div>
  );
}
