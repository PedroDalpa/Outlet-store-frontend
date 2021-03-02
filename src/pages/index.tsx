

import { useState } from 'react';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';


import styles from '../styles/pages/Home.module.css';
import api from '../services/api';
import { Notification } from '../components/Notification';



export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      
      const response = await api.post('/auth', {email, password});
     
      
      api.defaults.headers.authorization = `Bearer ${response.data.token}`;
      Cookies.set('token', String(`Bearer ${response.data.token}`));
      
      
      router.push('/dashboard');
     
    } catch (error) {
      console.error(error);
      Notification({
        type:'error',
        description:'Email ou senha incorretos', 
        title:'Erro no login'
      })
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


