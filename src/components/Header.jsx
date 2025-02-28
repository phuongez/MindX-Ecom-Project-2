import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { BsPhone, BsTablet, BsSmartwatch, BsHeadphones, BsUsbDrive } from "react-icons/bs";
import {Button, Dropdown, Input, Menu, Badge, ConfigProvider} from 'antd'
import { PhoneOutlined, ReadOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, Link  } from "react-router";
import { useState, useEffect } from "react";
import weblogo from '../assets/web-logo.png'
import { getAllProducts } from "../productsAPI";
import SearchBar from "./SearchBar";


const Header = ({isLoggedIn, setIsLoggedIn}) => {

    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    const [products, setProducts] = useState([]);

    useEffect(() => {
        sessionStorage.removeItem("currentUser")
        getAllProducts()
          .then((res) => res.json())
          .then((data) => setProducts(data.products.filter(product => product.category === "smartphones" || product.category === "laptops" || product.category === "tablets" || product.category === "mobile-accessories")));
      }, []);  

    const items = [
        {
            key: "profile",
            label: <NavLink to="/profile">Trang cá nhân</NavLink>,
        },
        {
            key: "history",
            label: <NavLink to="/profile">Lịch sử mua hàng</NavLink>,
        },
        {
            key: "logout",
            danger: true,
            label: <span onClick={handleLogout}>Đăng xuất</span>,
        },
      ];

    function handleLogout() {
        sessionStorage.removeItem("currentUser");
        localStorage.removeItem("currentUser");
        // setCurrentUser(null)
        setIsLoggedIn(false)
    }

    const getTotalCartQuantity = () => {
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (!currentUser || !currentUser.cart) return 0;
    
        return currentUser.cart.reduce((total, item) => total + item.quantity, 0);
    };    

    return (
        <div className="header">
            <div className="header-top">
                <Link to="/">
                    <img src={weblogo} alt="" width="150px"/>
                </Link>
                <SearchBar products={products} />
                <a href="tel:19002025">
                    <Button className="btn call-button" type="text">{<PhoneOutlined />} 19002025</Button>
                </a>
                <NavLink to="news">
                    <Button className="btn header-news-button" type="text">{<ReadOutlined />} Tin tức</Button>
                </NavLink>
                <NavLink to="cart">
                    <Badge count={getTotalCartQuantity()}>
                        <Button className="btn header-cart-button" type="text">{<ShoppingCartOutlined />} Giỏ hàng</Button> 
                    </Badge>
                </NavLink>            
                {!isLoggedIn 
                    ? (
                        <NavLink to="login">
                            <Button className="btn header-user-button" type="text">
                                {<UserOutlined />} Đăng nhập
                            </Button>    
                        </NavLink>
                    )  
                    : (
                        // <Button className="btn user-button account-btn" type="text" icon={<UserOutlined />}>{currentUser.name.split(" ")[0]}</Button>
                        <Dropdown menu={{items}} trigger={['click']} overlayClassName="custom-dropdown">
                            <ConfigProvider theme={{token: {colorPrimary: '#d60019',},}}>
                                <Button className="btn user-button account-btn" type="primary" style={{color: "white"}}>
                                    {<UserOutlined />} {currentUser.name.split(" ")[0]}
                                </Button>
                            </ConfigProvider>
                            
                        </Dropdown>
                    )
                }
            </div>
            {/* <div className="main-menu">
                <div className="main-menu-buttons">
                    <Button className="menu-button" type="text" icon={<BsPhone />}>Điện thoại</Button> 
                    <Button className="menu-button" type="text" icon={<BsTablet />}>Tablet</Button> 
                    <Button className="menu-button" type="text" icon={<BsSmartwatch />}>Smartwatch</Button> 
                    <Button className="menu-button" type="text" icon={<BsHeadphones />}>Tai nghe</Button> 
                    <Button className="menu-button" type="text" icon={<BsUsbDrive />}>Phụ kiện</Button>     
                </div>
            </div> */}
        </div>
    );
}
 
export default Header;