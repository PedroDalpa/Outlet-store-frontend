import { SideBarProvider } from '../../contexts/SideBarContext';
import { GetServerSideProps } from 'next';

export default function Dashboard() {
 

  return (
    
    <SideBarProvider>

      <h1 style={{marginLeft:'16rem'}}>dashboard</h1>
    </SideBarProvider>
    
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  
  
  context.res.setHeader('authorization','token')
  return {
    props: {},
  };
};