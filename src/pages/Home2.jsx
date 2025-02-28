import { getAllProducts, getByCategory } from "../productsAPI";
import { useState, useEffect, useContext } from "react";
import { Card, Carousel, List, Spin } from "antd";
import { data, Link, useNavigate } from "react-router";
import {Badge, Rate, Menu} from 'antd'
import { BsHeadphones, BsLaptop, BsPhone, BsTablet } from "react-icons/bs";
import { ReadOutlined } from "@ant-design/icons";
import { AppContext } from "../App";
import news from "../news";
import FooterSmall from "../components/FooterSmall";
import carousel1 from "../carousel/16-pro-max-Valentine-home.webp"
import carousel2 from "../carousel/dien-thoai-samsung-galaxy-s25-ultra-home-ct-moi.webp"
import carousel3 from "../carousel/dong-ho-thong-minh-riversong-glow-sw906-home.webp"
import carousel4 from "../carousel/laptop-asus-ai-11-02.webp"
import carousel5 from "../carousel/nothing-6-2-25-home.webp"
import carousel6 from "../carousel/oppo-reno-13f-sliding-20-01-2025-v2.webp"
import carousel7 from "../carousel/tecno-camon-30-pro-tai-nghe-home.webp"

const Home2 = () => {
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const navigate = useNavigate()
    const {items} = useContext(AppContext)
    // const items = value

    useEffect(() => {
        if (items.length > 0) {
            setLoading(false);
        }
    }, [items]);

    // Hàm chuyển tên danh mục sang slug
    const convertCategoryToSlug = (category) => {
        const mapping = {
        "smartphones": "dien-thoai",
        "laptop": "laptop",
        "tablets": "may-tinh-bang",
        "mobile-accessories": "phu-kien",
        };
        return mapping[category];
    };
    
    // Hàm chuyển tên sản phẩm thành slug
    const convertToSlug = (title) =>
        title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

    const formatPrice = (price) => {
        const roundedPrice = Math.round(price / 10000) * 10000 ;
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        })
          .format(roundedPrice)
          .replace("₫", "đ");
    };
    

    const phoneElements = items.filter(item => item.category === "smartphones").map(product => {
        const salePercentage = `${Math.floor(product.discountPercentage)}%`
        return (
                    <Badge.Ribbon text={salePercentage} color='#d60019' key={product.id}>
                        <Link 
                            to={`/${convertCategoryToSlug(product.category)}/${convertToSlug(product.title)}`}
                            style={{color: "black"}}
                        >
                            <div className="product-container" >
                                <img src={product.images[1]} alt="" />
                                <p className="product-name">{product.title}</p>
                                <p className="product-price">{formatPrice(product.price * 25000)}<span>{formatPrice(product.price * 25000 / (1-product.discountPercentage/100))}</span></p>
                                <div className="rating-container">
                                    <Rate 
                                        value={product.rating} 
                                        allowHalf
                                        disabled
                                        style={{color: "#ffb100", fontSize: "1em", marginRight: "2px", width: "fit-content"}}
                                    />
                                    <span>{parseFloat(product.rating).toFixed(1)}</span>
                                </div>
                            </div>                        
                        </Link>

                    </Badge.Ribbon>
                )
            })

    const mobileAccessoryElements = items.filter(item => item.category === "mobile-accessories").map(product => {
        const salePercentage = `${Math.floor(product.discountPercentage)}%`
        return (
                    <Badge.Ribbon text={salePercentage} color='#d60019' key={product.id}>
                        <Link 
                            to={`/${convertCategoryToSlug(product.category)}/${convertToSlug(product.title)}`}
                            style={{color: "black"}}
                        >
                            <div className="product-container" >
                                <img src={product.images[0]} alt="" />
                                <p className="product-name">{product.title}</p>
                                <p className="product-price">{formatPrice(product.price * 25000)}<span>{formatPrice(product.price * 25000 / (1-product.discountPercentage/100))}</span></p>
                                <div className="rating-container">
                                    <Rate 
                                        value={product.rating} 
                                        allowHalf
                                        disabled
                                        style={{color: "#ffb100", fontSize: "1em", marginRight: "2px", width: "fit-content"}}
                                    />
                                    <span>{parseFloat(product.rating).toFixed(1)}</span>
                                </div>
                            </div>                        
                        </Link>

                    </Badge.Ribbon>
                )
            })
            
    const laptopElements = items.filter(item => item.category === "laptops").map(product => {
        const salePercentage = `${Math.floor(product.discountPercentage)}%`
        return (
            <Badge.Ribbon text={salePercentage} color='#d60019' key={product.id}>
                <Link 
                    to={`/${convertCategoryToSlug(product.category)}/${convertToSlug(product.title)}`}
                    style={{color: "black"}}
                >
                    <div className="product-container" >
                        <img src={product.images[1]} alt="" />
                        <p className="product-name">{product.title}</p>
                        <p className="product-price">{formatPrice(product.price * 25000)}<span>{formatPrice(product.price * 25000 / (1-product.discountPercentage/100))}</span></p>
                        <div className="rating-container">
                            <Rate 
                                value={product.rating} 
                                allowHalf
                                disabled
                                style={{color: "#ffb100", fontSize: "1em", marginRight: "2px", width: "fit-content"}}
                            />
                            <span>{parseFloat(product.rating).toFixed(1)}</span>
                        </div>
                    </div>                        
                </Link>

            </Badge.Ribbon>
                )
            })   

    const tabletElements = items.filter(item => item.category === "tablets").map(product => {
        const salePercentage = `${Math.floor(product.discountPercentage)}%`
        return (
            <Badge.Ribbon text={salePercentage} color='#d60019' key={product.id}>
                <Link 
                    to={`/${convertCategoryToSlug(product.category)}/${convertToSlug(product.title)}`}
                    style={{color: "black"}}
                >
                    <div className="product-container" >
                        <img src={product.images[1]} alt="" />
                        <p className="product-name">{product.title}</p>
                        <p className="product-price">{formatPrice(product.price * 25000)}<span>{formatPrice(product.price * 25000 / (1-product.discountPercentage/100))}</span></p>
                        <div className="rating-container">
                            <Rate 
                                value={product.rating} 
                                allowHalf
                                disabled
                                style={{color: "#ffb100", fontSize: "1em", marginRight: "2px", width: "fit-content"}}
                            />
                            <span>{parseFloat(product.rating).toFixed(1)}</span>
                        </div>
                    </div>                        
                </Link>

            </Badge.Ribbon>
                )
            })          
    
    const inlineMenuitems = [
        {
            key: 'dien-thoai',
            label: 'Điện thoại',
            icon: <BsPhone />,
        },
        {
            key: 'may-tinh-bang',
            label: 'Máy tính bảng',
            icon: <BsTablet />,
        },
        {
            key: 'laptop',
            label: 'Laptop',
            icon: <BsLaptop />,
        },
        {
            key: 'phu-kien',
            label: 'Phụ kiện',
            icon: <BsHeadphones />,
        },
        {
            key: 'news',
            label: 'Tin công nghệ',
            icon: <ReadOutlined />,
        },
        
    ];        
    
    return ( 
        <main>
            <section className="page-promotion">
                <Menu
                    onClick={(info) => {
                        navigate(`/${info.key}`)
                    }}
                    className="inline-menu"
                    mode="inline"
                    items={inlineMenuitems}
                />
                <section className="promotion-carousel">
                    <Carousel autoplay pauseOnHover>
                        <img src={carousel1} alt="" />
                        <img src={carousel2} alt="" />
                        <img src={carousel3} alt="" />
                        <img src={carousel4} alt="" />
                        <img src={carousel5} alt="" />
                        <img src={carousel6} alt="" />
                        <img src={carousel7} alt="" />
                    </Carousel>
                </section>
                <div className="latest-news">
                    <div className="latest-news-title">Tin mới nhất</div>
                    {news.filter((article) => article.id < 6).map(art => (
                        <Link key={art.id} to={`/news/${art.slug}`}>
                            <div className="home-latest-news-container" >
                                <img src={art.image} alt="" />
                                <p>{art.title}</p>
                            </div>
                        </Link>
                        
                    ))}
                </div>
            </section>
            
            <Link to="/dien-thoai" style={{textDecoration: "none", color: "black"}}>
                <h1 className="section-name">Điện thoại</h1>
            </Link>
            <div className="products-view">
                {loading && <Spin size="large" />}
                {phoneElements}
            </div>
            <Link to="/may-tinh-bang" style={{textDecoration: "none", color: "black"}}>
                <h1 className="section-name">Máy tính bảng</h1>
            </Link>
            <div className="products-view">
                {loading && <Spin size="large" />}
                {tabletElements}
            </div>
            <Link to="/laptop" style={{textDecoration: "none", color: "black"}}>
                <h1 className="section-name">Laptop</h1>
            </Link>
            <div className="products-view">
                {loading && <Spin size="large" />}
                {laptopElements}
            </div>
            <Link to="/phu-kien" style={{textDecoration: "none", color: "black"}}>
                <h1 className="section-name">Phụ kiện</h1>
            </Link>
            <div className="products-view">
                {loading && <Spin size="large" />}    
                {mobileAccessoryElements}
            </div>
            
        </main>
        
    );
}
 
export default Home2;