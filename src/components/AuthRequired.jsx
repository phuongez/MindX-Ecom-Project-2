import { message } from "antd";
import { Outlet, Navigate, useLocation } from "react-router";

const  AuthRequired = ({isLoggedIn}) => {
    const location = useLocation() 

    if (!isLoggedIn) {
        return (
            <Navigate 
                to="/login"
                state={{message: "You must log in first",
                    from: location.pathname}
                }
                replace
            />
        )
    }
    return ( 
        <Outlet />
    );
}
 
export default  AuthRequired;