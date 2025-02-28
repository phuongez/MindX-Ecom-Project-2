import { useState, createContext, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetial'
import { getAllProducts } from './productsAPI'
import './App.css'
import Signup from './pages/Signup'
import '@ant-design/v5-patch-for-react-19';
import Home2 from './pages/Home2'
import AuthRequired from './components/AuthRequired'
import Cart from './pages/Cart'
import ProductsByCategory from './pages/ProductsByCategory'
import { ConsoleSqlOutlined } from '@ant-design/icons'
import NewsList from './pages/NewsList'
import NewsDetail from './pages/NewsDetail'
import ForgotPassword from './pages/ForgotPassword'
import Contact from './pages/Contact'

const AppContext = createContext()

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  //Update giỏ hàng để re-render
  const [cart, setCart] = useState(() => {
    // Lấy giỏ hàng từ sessionStorage nếu có
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Khi giỏ hàng thay đổi, cập nhật sessionStorage
  useEffect(() => {
      sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const handleLogin = (user) => {
      setIsLoggedIn(true);
      sessionStorage.setItem("currentUser", JSON.stringify(user));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Bắt đầu tải
      setError(null); // Reset lỗi

      try {
        const res = await getAllProducts();

        if (!res.ok) {
          throw new Error(`Lỗi API: ${res.statusText}`);
        }

        const data = await res.json();
        setItems(data.products);
      } catch (err) {
        console.error("Fetch thất bại:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
      <AppContext.Provider value={{items,cart,setCart}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>
                <Route index element={<Home2 />} />
                <Route path='login' element={<Login onLogin={handleLogin}/>}/>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path='signup' element={<Signup />}/>
                <Route path='contact' element={<Contact />}/>
                <Route path="/:category" element={<ProductsByCategory />} />
                <Route path="/:category/:slug" element={<ProductDetail />} />
                <Route path="/news" element={<NewsList />} />
                <Route path="/news/:slug" element={<NewsDetail />} />
                <Route element={<AuthRequired isLoggedIn={isLoggedIn}/>}>
                  <Route path='cart' element={<Cart />}/>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
      </AppContext.Provider>
    
  )
}

export default App
export {AppContext}
