import {
  createContext, ReactNode, useState,
} from 'react';


import { CreateCategoryModal  } from '../../components/product/category/CreateCategoryModal';


interface CategoryProviderProps {
  children: ReactNode;
  itens: any;
}

interface CategoryContextData {
  closeCreateCategoryModal: () => void;
  openCreateCategoryModal: () => void;
  categorys: Category[];
}



interface Category {
  id:string;
  name:string;
  created: string;
}

export const CategoryContext = createContext({} as CategoryContextData);

export function CategoryProvider({
  children,
  ...rest
}: CategoryProviderProps) {
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [categorys, setCategorys] = useState(rest.itens); 
  
  
  
  
  function closeCreateCategoryModal() {
    setIsCreateCategoryModalOpen(false);
  } 

  function openCreateCategoryModal() {
    setIsCreateCategoryModalOpen(true);
  } 
  
  
  
  

  return (
    <CategoryContext.Provider value={{
      closeCreateCategoryModal,
      openCreateCategoryModal,
      categorys,
      
    }}
    >
      { children }
     { isCreateCategoryModalOpen && <CreateCategoryModal /> }
     
    </CategoryContext.Provider>
  );
}


