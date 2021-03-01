import '../styles/global.css';
import 'antd/dist/antd.css';
import { BrandProvider } from '../contexts/product/BrandContext';

function MyApp({ Component, pageProps }) {
  
  return (
    
      <Component {...pageProps} />
   
  );
}

export default MyApp;
