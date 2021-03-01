import {
  createContext, ReactNode, 
} from 'react';


import { SideBar } from '../components/Sidebar';



interface SideBarProviderProps {
  children: ReactNode;
}

export const SideBarContext = createContext({} );

export function SideBarProvider({
  children,
 
}: SideBarProviderProps) {
 

 
  
  return (
    <SideBarContext.Provider value={{
      
     
    }}
    >
      { children }
      <SideBar />
     
    </SideBarContext.Provider>
  );
}
