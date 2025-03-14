import { Image, Rate, Button, Breadcrumb, ConfigProvider } from "antd";
import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router";
import { AppContext } from "../App";
import CheckoutModal from "../components/CheckoutModal";


const ProductDetail = () => {
    const { category, slug } = useParams();
    const { cart, setCart } = useContext(AppContext);
    const {items} = useContext(AppContext)
    const [product, setProduct] = useState(null);
    const [isCheckoutVisible, setCheckoutVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const convertToSlug = (title) =>
        title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

    const convertSlugToTitle = (slug) => {
        const mapping = {
        "dien-thoai": "Điện thoại",
        "laptop": "laptop",
        "may-tinh-bang": "Máy tính bảng",
        "phu-kien": "Phụ kiện",
        };
        return mapping[slug];
    };

    useEffect (()=> {
        setProduct(items.find((p) => convertToSlug(p.title) === slug))
    },[slug])
    

    const addToCart = (product) => {
        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      
        if (!currentUser) {
          alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
          navigate('/login', { state: { from: location.pathname } });
          return;
        }
      
        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        // Cập nhật giỏ hàng
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        const existingProduct = currentUser.cart.find(p => p.id === product.id);
        let updatedCart;
    
        if (existingProduct) {
            updatedCart = currentUser.cart.map(p =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            );
        } else {
            updatedCart = [...currentUser.cart, { ...product, quantity: 1 }];
        }
    
        // Cập nhật lại giỏ hàng của currentUser
        currentUser.cart = updatedCart;
        users[userIndex] = currentUser;
        
        // Lưu vào storage
        localStorage.setItem("users", JSON.stringify(users));
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    
        // Cập nhật state để re-render UI
        setCart(updatedCart);
        
        alert("Đã thêm vào giỏ hàng!");
    };
    

    const handleConfirmOrder = (orderInfo) => {

        const order = {
            id: "ORDER_" + new Date().getTime(),
            user: "Guest",
            items: product,
            totalPrice: product.price,
            shippingInfo: orderInfo,
            status: "Đang xử lý",
            date: new Date().toLocaleString(),
        };

        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        alert("Đặt hàng thành công! Mã đơn hàng: " + order.id);
        setCheckoutVisible(false);
    };
        

    const formatPrice = (price) => {
        const roundedPrice = Math.round(price / 10000) * 10000 ;
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        })
          .format(roundedPrice)
          .replace("₫", "đ");
    };      
    
      if (!product) return <p>Đang tải...</p>;

    return ( 
        <div className="product-detail-page">
            <Breadcrumb className="detail-breadcrumb"
                    items={[
                    {
                        title: <Link to="/">Trang chủ</Link>,
                    },
                    {
                        title: <Link to={`/${category}`}>{convertSlugToTitle(category)}</Link>,
                    },
                    {
                        title: `${product.title}`,
                    },
                    ]}
            />
            <div className="product-detail-display">
                <div className="left-container">
                    <div className="product-images">
                        <div className="small-image-container">
                            <img 
                                className="product-image-small" 
                                src={product.images[0]} 
                                alt="" 
                                onClick={()=> document.querySelector(".product-image-main").src = product.images[0]}
                            />
                        </div>
                        <div className="small-image-container">
                            <img 
                                className="product-image-small" 
                                src={product.images[1]} 
                                alt="" 
                                onClick={()=> document.querySelector(".product-image-main").src = product.images[1]}
                            />
                        </div>
                        <div className="small-image-container">
                            <img 
                                className="product-image-small" 
                                src={product.images[2]} 
                                alt="" 
                                onClick={()=> document.querySelector(".product-image-main").src = product.images[2]}
                            />
                        </div>
                    </div>
                    <div className="product-image-large">
                        <img className="product-image-main" src={product.images[0]} style={{width: "250px"}}/>
                    </div>
                    
                </div>    
                <div className="right-container">
                    <h1>{product.title}</h1>
                    <div className="rating-container">
                        <Rate 
                            value={product.rating} 
                            allowHalf
                            disabled
                            style={{color: "#ffb100", fontSize: "1em", marginRight: "2px", width: "fit-content"}}
                        />
                        <span>{parseFloat(product.rating).toFixed(1)}</span>
                    </div>
                    <p className="product-price">{formatPrice(product.price * 25000)}<span>{formatPrice(product.price * 25000 / (1-product.discountPercentage/100))}</span></p>
                    <p className="vat-price">Giá đã bao gồm VAT</p>
                    <p style={{lineHeight: "1.5"}}>{product.description}</p>
                    <div className="action-btns">
                        <ConfigProvider theme={{token: {colorPrimary: '#d60019',},}}>
                            <Button block type="primary" onClick={() => setCheckoutVisible(true)}>Mua ngay</Button>
                        </ConfigProvider>
                        <ConfigProvider theme={{token: {colorPrimary: '#d60019',},}}>
                            <Button block onClick={() => addToCart(product)}>Thêm vào giỏ</Button>
                        </ConfigProvider>
                    </div>
                </div>
            </div> 
            <div className="product-reviews">
                <h2>Customer Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <div key={index} className="review">
                            <p><strong>{review.reviewerName}</strong> ({new Date(review.date).toLocaleDateString()})</p>
                            <p>Rating: {review.rating} ⭐</p>
                            <p>{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>   
            <CheckoutModal
                visible={isCheckoutVisible}
                onClose={() => setCheckoutVisible(false)}
                onConfirm={handleConfirmOrder}
            />
        </div>
    );
}
 
export default ProductDetail;