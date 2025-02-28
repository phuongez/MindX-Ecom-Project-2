import { HomeOutlined, MenuOutlined, PhoneOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import {Button, Dropdown, Menu} from "antd"
import { BsHeadphones, BsLaptop, BsPhone, BsTablet } from "react-icons/bs";
import { TbPhoneCalling } from "react-icons/tb";
import { Link, NavLink } from "react-router";

const FooterSmall = ({isLoggedIn, setIsLoggedIn}) => {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
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

    const inlineMenuitems = [
        {
            key: "dien-thoai",
            label: <NavLink to="/dien-thoai">Điện thoại</NavLink>,
            icon: <BsPhone />,
        },
        {
            key: "may-tinh-bang",
            label: <NavLink to="/may-tinh-bang">Máy tính bảng</NavLink>,
            icon: <BsTablet />,
        },
        {
            key: "laptop",
            label: <NavLink to="/laptop">Laptop</NavLink>,
            icon: <BsLaptop />,
        },
        {
            key: "phu-kien",
            label: <NavLink to="/phu-kien">Phụ kiện</NavLink>,
            icon: <BsHeadphones />,
        },
        {
            key: "news",
            label: <NavLink to="/news">Tin tức</NavLink>,
            icon: <ReadOutlined />,
        },
        
    ];      

    return ( 
        <div className="footer-small-screen">
            <Dropdown menu={{items: inlineMenuitems}} trigger={['click']} overlayClassName="footer-dropdown">
                <Button><MenuOutlined/>Danh mục</Button>
            </Dropdown>    
            <NavLink to="/news">
                <Button><ReadOutlined/>Tin tức</Button>
            </NavLink>
            <NavLink to="/">
                <Button><HomeOutlined/>Trang chủ</Button>
            </NavLink>
            {!isLoggedIn 
                ? (
                    <NavLink to="login">
                        <Button className="btn footer-user-button" type="text">
                            {<UserOutlined />} Đăng nhập
                        </Button>    
                    </NavLink>
                )  
                : (
                    <Dropdown menu={{items}} trigger={['click']} overlayClassName="custom-dropdown">
                        <Button className="btn footer-user-button" type="text" style={{color: "white"}}>
                        {<UserOutlined />} {currentUser.name.split(" ")[0]}
                        </Button>
                    </Dropdown>
                )
            }
            <Button><PhoneOutlined/>Liên hệ</Button>
        </div>
    );
}
 
export default FooterSmall;