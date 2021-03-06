import {
  createContext, ReactNode, useState,
} from 'react';


import { CreateProviderModal  } from '../../components/product/provider/CreateProviderModal';


interface ProviderProviderProps {
  children: ReactNode;
  itens: any;
}

interface ProviderContextData {
  closeCreateProviderModal: () => void;
  openCreateProviderModal: () => void;
  providers: Provider[];
}



interface Provider {
  id:string;
  name:string;
  created: string;
}

export const ProviderContext = createContext({} as ProviderContextData);

export function ProviderProvider({
  children,
  ...rest
}: ProviderProviderProps) {
  const [isCreateProviderModalOpen, setIsCreateProviderModalOpen] = useState(false);
  const [providers, setProviders] = useState(rest.itens); 
  
  
  
  
  function closeCreateProviderModal() {
    setIsCreateProviderModalOpen(false);
  } 

  function openCreateProviderModal() {
    setIsCreateProviderModalOpen(true);
  } 
  
  
  
  

  return (
    <ProviderContext.Provider value={{
      closeCreateProviderModal,
      openCreateProviderModal,
      providers,
      
    }}
    >
      { children }
     { isCreateProviderModalOpen && <CreateProviderModal /> }
     
    </ProviderContext.Provider>
  );
}


