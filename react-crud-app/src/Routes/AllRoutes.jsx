import { Route, Routes } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Home from "../Pages/Home";

function AllRoutes(){
    return(
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    )
}
export default AllRoutes