import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import FooterSmall from "./FooterSmall";

const Layout = ({isLoggedIn, setIsLoggedIn}) => {
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Outlet />
            <Footer />
            <div className="footer-small">
                <FooterSmall isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            </div>
        </div>
    );
}
 
export default Layout;