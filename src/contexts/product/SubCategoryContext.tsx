import {
  createContext, ReactNode, useState,
} from 'react';


import { CreateSubCategoryModal  } from '../../components/product/subcategory/CreateSubCategoryModal';


interface SubCategoryProviderProps {
  children: ReactNode;
  itens: any;
}

interface SubCategoryContextData {
  closeCreateSubCategoryModal: () => void;
  openCreateSubCategoryModal: () => void;
  subCategorys: SubCategory[];
}



interface SubCategory {
  id:string;
  name:string;
  created: string;
}

export const SubCategoryContext = createContext({} as SubCategoryContextData);

export function SubCategoryProvider({
  children,
  ...rest
}: SubCategoryProviderProps) {
  const [isCreateSubCategoryModalOpen, setIsCreateSubCategoryModalOpen] = useState(false);
  const [subCategorys, setSubCategorys] = useState(rest.itens); 
  
  
  
  
  function closeCreateSubCategoryModal() {
    setIsCreateSubCategoryModalOpen(false);
  } 

  function openCreateSubCategoryModal() {
    setIsCreateSubCategoryModalOpen(true);
  } 
  
  
  
  

  return (
    <SubCategoryContext.Provider value={{
      closeCreateSubCategoryModal,
      openCreateSubCategoryModal,
      subCategorys,
      
    }}
    >
      { children }
     { isCreateSubCategoryModalOpen && <CreateSubCategoryModal /> }
     
    </SubCategoryContext.Provider>
  );
}


