import {BrowserRouter,Routes,Route} from "react-router-dom"
import {Formulario} from "../pages/Formulario"
import LeerDatos from "../pages/LeerDatos";
export function MyRoutes() {
  return (<BrowserRouter>
  <Routes>
   <Route path="/" element={<Formulario/>}/>
   <Route path="/leerweb" element={<LeerDatos/>}/>
  </Routes>
  </BrowserRouter>);
}
