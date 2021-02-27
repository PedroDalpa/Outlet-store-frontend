import { SideBarProvider } from "../../contexts/SideBarContext";

export default function CreateProduct() {
  return (
    <SideBarProvider>
      <h1 style={{marginLeft:'16rem'}}>create</h1>
    </SideBarProvider> 
  );
}
