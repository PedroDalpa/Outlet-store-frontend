
import { GetServerSideProps } from 'next';

export default function Dashboard() {
 

  return (
    
    

    <h1>dashboard</h1>
   
    
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  
  
  context.res.setHeader('authorization','token')
  return {
    props: {},
  };
};