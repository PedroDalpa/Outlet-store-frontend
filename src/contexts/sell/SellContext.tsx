import {
  createContext, ReactNode, useState,
} from 'react';

import { CreateSellModal } from '../../components/sell/sell/CreateSellModal';

interface SellProviderProps {
  children: ReactNode;
  itens: any;
}

interface Sell {
  id:string;
  name:string;
  created: string;
}

interface SellContextData {
  closeCreateSellModal: () => void;
  openCreateSellModal: () => void;
  sell: Sell[];
}

export const SellContext = createContext({} as SellContextData);

export function SellProvider({
  children,
  ...rest
}: SellProviderProps) {
  const [isCreateSellModalOpen, setIsCreateSellModalOpen] = useState(false);
  const [sell, setSells] = useState(rest.itens);

  function closeCreateSellModal() {
    setIsCreateSellModalOpen(false);
  }

  function openCreateSellModal() {
    setIsCreateSellModalOpen(true);
  }

  return (
    <SellContext.Provider value={{
      closeCreateSellModal,
      openCreateSellModal,
      sell,

    }}
    >
      { children }
      { isCreateSellModalOpen && <CreateSellModal /> }

    </SellContext.Provider>
  );
}
