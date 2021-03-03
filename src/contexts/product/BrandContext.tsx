import {
  createContext, ReactNode, useState,
} from 'react';


import { CreateBrandModal  } from '../../components/product/brand/CreateBrandModal';


interface BrandProviderProps {
  children: ReactNode;
  itens: any;
}

interface BrandContextData {
  closeCreateBrandModal: () => void;
  openCreateBrandModal: () => void;
  brands: Brands[];
}



interface Brands {
  id:string;
  name:string;
  created: string;
}

export const BrandContext = createContext({} as BrandContextData);

export function BrandProvider({
  children,
  ...rest
}: BrandProviderProps) {
  const [isCreateBrandModalOpen, setIsCreateBrandModalOpen] = useState(false);
  const [brands, setBrands] = useState(rest.itens); 
  
  
  
  
  function closeCreateBrandModal() {
    setIsCreateBrandModalOpen(false);
  } 

  function openCreateBrandModal() {
    setIsCreateBrandModalOpen(true);
  } 
  
  
  
  

  return (
    <BrandContext.Provider value={{
      closeCreateBrandModal,
      openCreateBrandModal,
      brands,
      
    }}
    >
      { children }
     { isCreateBrandModalOpen && <CreateBrandModal /> }
     
    </BrandContext.Provider>
  );
}


