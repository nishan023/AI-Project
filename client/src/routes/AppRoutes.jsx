import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";


const AppRoutes=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes;