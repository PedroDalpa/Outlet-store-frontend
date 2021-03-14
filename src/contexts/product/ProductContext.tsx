import {
  createContext, ReactNode, useState,
} from 'react';

import { CreateProductModal } from '../../components/product/product/CreateProductModal';

interface ProductProviderProps {
  children: ReactNode;
  itens: any;
}

interface Product {
  id:string;
  name:string;
  created: string;
}

interface ProductContextData {
  closeCreateProductModal: () => void;
  openCreateProductModal: () => void;
  products: Product[];
}

export const ProductContext = createContext({} as ProductContextData);

export function ProductProvider({
  children,
  ...rest
}: ProductProviderProps) {
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const [products, setProducts] = useState(rest.itens);

  function closeCreateProductModal() {
    setIsCreateProductModalOpen(false);
  }

  function openCreateProductModal() {
    setIsCreateProductModalOpen(true);
  }

  return (
    <ProductContext.Provider value={{
      closeCreateProductModal,
      openCreateProductModal,
      products,

    }}
    >
      { children }
      { isCreateProductModalOpen && <CreateProductModal /> }

    </ProductContext.Provider>
  );
}
