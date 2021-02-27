import {
  createContext, ReactNode, useState,
} from 'react';

import { LevelUpModal } from '../components/LevelUpModal';
import { SideBar } from '../components/Sidebar';

interface SideBarContextData {
  closeLevelUpModal: () => void;
}

interface SideBarProviderProps {
  children: ReactNode;
}

export const SideBarContext = createContext({} as SideBarContextData);

export function SideBarProvider({
  children,
 
}: SideBarProviderProps) {
 
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
 
  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  return (
    <SideBarContext.Provider value={{
      
      closeLevelUpModal,
    }}
    >
      { children }
      <SideBar />
      {isLevelUpModalOpen && <LevelUpModal />}
    </SideBarContext.Provider>
  );
}
