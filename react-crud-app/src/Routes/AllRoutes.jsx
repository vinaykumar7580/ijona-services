import { Route, Routes } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import PrivateRoute from "../Context/PrivateRoute";

function AllRoutes(){
    return(
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
        </Routes>
    )
}
export default AllRoutes