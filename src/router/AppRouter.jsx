import { Route, Routes } from "react-router-dom"


import { LoginPage } from "../auth"
import { HeroesRoutes } from "../heroes"
import { Navbar } from "../ui"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"


export const AppRouter = () => {
  return (
    <>

         <Routes>
            <Route path="login/*" element={
            <PublicRoute> 
              <Routes>
                <Route path="/" element={ <LoginPage/> }/>
                <Route path="/*" element={ <h1><b>404 not found</b></h1>}/>
              </Routes>
            </PublicRoute>
          }/>


            <Route path="/*" element={
              <PrivateRoute>
                <HeroesRoutes/> 
              </PrivateRoute>
            }/>
            

         </Routes>
    </>
  )
}
