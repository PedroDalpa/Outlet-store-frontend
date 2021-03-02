import '../styles/global.css';
import 'antd/dist/antd.css';

import { SideBarProvider } from '../contexts/SideBarContext';

function MyApp({ Component, pageProps }) {
  
  return (
    <SideBarProvider>
      
    
      <Component {...pageProps} />
    </SideBarProvider>
   
  );
}

export default MyApp;
