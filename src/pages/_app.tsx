import '../styles/global.css';


import { SideBarProvider } from '../contexts/SideBarContext';

function MyApp({ Component, pageProps }) {
  
  return (
    <SideBarProvider>
      
    
      <Component {...pageProps} />
    </SideBarProvider>
   
  );
}

export default MyApp;
