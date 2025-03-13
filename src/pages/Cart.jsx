import { DeleteOutlined } from "@ant-design/icons";
import { Button, InputNumber, ConfigProvider } from "antd";
import { useEffect, useState, useContext } from "react";
import CheckoutModal from "../components/CheckoutModal";
import { AppContext } from "../App";

const Cart = () => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    // const [cart, setCart] = useState(currentUser?.cart || []);
    const { cart, setCart } = useContext(AppContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCheckoutVisible, setCheckoutVisible] = useState(false);

    useEffect(() => {
        setTotalPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0));
    }, [cart]);

    // Cập nhật giỏ hàng vào sessionStorage & localStorage
    const updateStorage = (updatedCart) => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        if (currentUser) {
            currentUser.cart = updatedCart;
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

            // Tìm và cập nhật dữ liệu người dùng trong localStorage theo phoneNumber
            users = users.map(user => 
                user.phoneNumber === currentUser.phoneNumber ? { ...user, cart: updatedCart } : user
            );
            localStorage.setItem("users", JSON.stringify(users));
        }
    };

    const updateQuantity = (id, value) => {
        if (value <= 0) {
            removeProduct(id);
        } else {
            setCart(prevCart => {
                const updatedCart = prevCart.map(item =>
                    item.id === id ? { ...item, quantity: value } : item
                );
                updateStorage(updatedCart);
                return updatedCart;
            });
        }
    };

    const removeProduct = (id) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.id !== id);
            updateStorage(updatedCart);
            return updatedCart;
        });
    };

    const formatPrice = (price) => {
        const roundedPrice = Math.round(price / 10000) * 10000;
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(roundedPrice).replace("₫", "đ");
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Giỏ hàng của bạn đang trống!");
            return;
        }
        setCheckoutVisible(true);
    };

    // const handleConfirmOrder = (orderInfo) => {
    //     const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    //     const order = {
    //         id: "ORDER_" + new Date().getTime(),
    //         user: currentUser.phoneNumber,
    //         items: cart,
    //         totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    //         shippingInfo: orderInfo,
    //         status: "Đang xử lý",
    //         date: new Date().toLocaleString(),
    //     };

    //     let orders = JSON.parse(localStorage.getItem("orders")) || [];
    //     orders.push(order);
    //     localStorage.setItem("orders", JSON.stringify(orders));

    //     // Xóa giỏ hàng sau khi đặt hàng thành công
    //     currentUser.cart = [];
    //     sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

    //     // Cập nhật users trong localStorage
    //     let users = JSON.parse(localStorage.getItem("users")) || [];
    //     users = users.map(user => 
    //         user.phoneNumber === currentUser.phoneNumber ? { ...user, cart: [] } : user
    //     );
    //     localStorage.setItem("users", JSON.stringify(users));

    //     alert("Đặt hàng thành công! Mã đơn hàng: " + order.id);
    //     setCheckoutVisible(false);
    //     setCart([]);
    // };

    const handleConfirmOrder = (orderInfo) => {
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    
        const order = {
            id: "ORDER_" + new Date().getTime(),
            user: currentUser.phoneNumber,
            items: cart,
            totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
            shippingInfo: orderInfo,
            status: "Đang xử lý",
            date: new Date().toLocaleString(),
        };
    
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
    
        // Xóa giỏ hàng trong sessionStorage và localStorage
        currentUser.cart = [];
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.map(user => 
            user.phoneNumber === currentUser.phoneNumber ? { ...user, cart: [] } : user
        );
        localStorage.setItem("users", JSON.stringify(users));
    
        alert("Đặt hàng thành công! Mã đơn hàng: " + order.id);
        setCheckoutVisible(false);
        
        // **Cập nhật giỏ hàng trong AppContext**
        setCart([]); 
    };

    if (currentUser.cart.length === 0) {
        return (
            <div className="cart-page">
                <h1>Bạn cần thêm sản phẩm vào giỏ hàng trước</h1>
            </div>
        )
    }

    return (
        <div className="cart-page">
            {currentUser.cart.map((product) => (
                <div className="product-in-cart-container" key={product.id}>
                    <div className="cart-product-img">
                        <img style={{ height: "90px" }} src={product.images[1]} alt="" />
                    </div>
                    <div className="cart-product-info">
                        <p style={{ fontWeight: "bold" }}>{product.title}</p>
                        <div>
                            <p className="product-price">{formatPrice(product.price * 25000)}</p>
                            <p style={{ textDecoration: "line-through" }}>
                                {formatPrice(product.price * 25000 / (1 - product.discountPercentage / 100))}
                            </p>
                        </div>
                    </div>
                    <div className="quantity-container">
                        <InputNumber
                            className="cart-product-quantity"
                            value={product.quantity}
                            min={0}
                            onChange={(value) => updateQuantity(product.id, value)}
                        />
                        <Button
                            style={{ border: "0", fontSize: "1.2rem" }}
                            icon={<DeleteOutlined />}
                            onClick={() => removeProduct(product.id)}
                        />
                    </div>
                </div>
            ))}

            <div className="total-cart-value">
                <div className="total-cart-left">
                    <p>Tạm tính: <span>{formatPrice(totalPrice * 25000)}</span></p>
                    <p className="price-note">Chưa bao gồm khuyến mại</p>
                </div>
                <div className="total-cart-right">
                    <ConfigProvider theme={{ token: { colorPrimary: '#d60019' } }}>
                        <Button type="primary" className="buynow-btn" onClick={handleCheckout}>
                            Thanh toán
                        </Button>
                    </ConfigProvider>
                </div>
            </div>

            <CheckoutModal
                visible={isCheckoutVisible}
                onClose={() => setCheckoutVisible(false)}
                onConfirm={handleConfirmOrder}
            />
        </div>
    );
};

export default Cart;
