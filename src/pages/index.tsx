

import { useState } from 'react';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';


import styles from '../styles/pages/Home.module.css';
import api from '../services/api';



export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      
      const response = await api.post('/auth', {email, password});
      localStorage.setItem('token', JSON.stringify(response.data.token));
      
     
      Cookies.set('token', String(`Bearer ${response.data.token}`));
      
      
      router.push('/dashboard');
     
    } catch (error) {
      console.error(error);
      
    }
    

  }

  return (
    <div className={styles.logonContainer}>
      <section className="form">
       

        <form onSubmit={handleLogin} >
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Seu usuário"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          
          <input 
            placeholder="Sua senha"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

         
        </form>
      </section>

      <img src='/logos/outletLogo.jpeg' alt="Heroes" />
    </div>
    
  );
}


