import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router'


import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const router = useRouter()
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e) {
    e.preventDefault();

    router.push('/dashboard');

  }

  return (
    <div className={styles.logonContainer}>
      <section className="form">
       

        <form onSubmit={handleLogin} >
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Seu usuário"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          
          <input 
            placeholder="Sua senha"
            
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

         
        </form>
      </section>

      <img src='/logos/outletLogo.jpeg' alt="Heroes" />
    </div>
    
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
