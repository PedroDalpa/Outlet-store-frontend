import {
  createContext, ReactNode, 
} from 'react';

import { useRouter } from 'next/router'


import { Sidebar } from '../components/SideBar/Sidebar';



interface SideBarProviderProps {
  children: ReactNode;
}

export const SideBarContext = createContext({} );

export function SideBarProvider({
  children,
 
}: SideBarProviderProps) {
 

  const router = useRouter();
  const pathname = router.pathname

  const showSideBar = pathname === '/' ? false:true
  
  
  return (
    
    <SideBarContext.Provider value={{
      
    }}
    >
       <Sidebar screen={children} display={showSideBar}/> 
  
      
     
    </SideBarContext.Provider>
  );
}
