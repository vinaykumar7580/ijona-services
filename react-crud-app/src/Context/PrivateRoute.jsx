import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({children}){
    const {token}=useContext(AppContext)

    console.log(token)

    if(token==null){
        return <Navigate to="/login"/>
    }
    return children

}
export default PrivateRoute