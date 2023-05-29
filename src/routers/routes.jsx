import {BrowserRouter,Routes,Route} from "react-router-dom"
import {Formulario} from "../pages/Formulario"
export function MyRoutes() {
  return (<BrowserRouter>
  <Routes>
   <Route path="/" element={<Formulario/>}/>
  </Routes>
  </BrowserRouter>);
}
