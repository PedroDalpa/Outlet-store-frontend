import {
  createContext, ReactNode, useState,
} from 'react';

import { CreatePurchaseModal } from '../../components/purchase/purchase/CreatePurchaseModal';

interface PurchaseProviderProps {
  children: ReactNode;
  itens: any;
}

interface Purchase {
  id:string;
  name:string;
  created: string;
}

interface PurchaseContextData {
  closeCreatePurchaseModal: () => void;
  openCreatePurchaseModal: () => void;
  purchase: Purchase[];
}

export const PurchaseContext = createContext({} as PurchaseContextData);

export function PurchaseProvider({
  children,
  ...rest
}: PurchaseProviderProps) {
  const [isCreatePurchaseModalOpen, setIsCreatePurchaseModalOpen] = useState(false);
  const [purchase, setPurchases] = useState(rest.itens);

  function closeCreatePurchaseModal() {
    setIsCreatePurchaseModalOpen(false);
  }

  function openCreatePurchaseModal() {
    setIsCreatePurchaseModalOpen(true);
  }

  return (
    <PurchaseContext.Provider value={{
      closeCreatePurchaseModal,
      openCreatePurchaseModal,
      purchase,

    }}
    >
      { children }
      { isCreatePurchaseModalOpen && <CreatePurchaseModal /> }

    </PurchaseContext.Provider>
  );
}
