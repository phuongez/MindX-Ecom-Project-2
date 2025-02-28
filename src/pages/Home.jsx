import { Button, Carousel, Badge, Rate } from 'antd';
import samsungLogo from '../assets/samsung.png'
import StarRating from '../components/StarRating';
import phoneProducts from '../phoneProducts';
import { getAllProducts } from '../productsAPI';

const Home = () => {

    const formatPrice = (price) => {
        const roundedPrice = Math.round(price / 10000) * 10000;
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        })
          .format(roundedPrice)
          .replace("₫", "đ");
    };

    const cellphoneProductsElements = phoneProducts.map(product => {
        const salePercentage = `${Math.floor(product.discount)}%`
        return (
            <Badge.Ribbon text={salePercentage} color='#f77925'>
            <div className="product-container" key={product.id}>
                {/* <div className="sale-percentage">{Math.floor(product.discount)}%</div> */}
                <img src={product.image} alt="" />
                <p className="product-name">{product.name}</p>
                <p className="product-price">{formatPrice(product.price*(1-product.discount/100))}<span>{formatPrice(product.price)}</span></p>
                <div className="rating-container">
                    <Rate 
                        value={product.rating} 
                        allowHalf
                        disabled
                        style={{color: "#ffb100", fontSize: "1em", marginRight: "2px", width: "fit-content"}}
                    />
                    <span>{product.rating}</span>
                </div>
            </div>
            </Badge.Ribbon>
        )
    })

    const uniqueBrands = [...new Set(phoneProducts.map(product => product.brand))]


    return (  
        <main>
            <section className="promotion-carousel">
                <Carousel style={{width: "60%"}} autoplay pauseOnHover>
                    <img src="src/carousel/16-pro-max-Valentine-home.webp" alt="" />
                    <img src="src/carousel/dien-thoai-samsung-galaxy-s25-ultra-home-ct-moi.webp" alt="" />
                    <img src="src/carousel/dong-ho-thong-minh-riversong-glow-sw906-home.webp" alt="" />
                    <img src="src/carousel/laptop-asus-ai-11-02.webp" alt="" />
                    <img src="src/carousel/nothing-6-2-25-home.webp" alt="" />
                    <img src="src/carousel/oppo-reno-13f-sliding-20-01-2025-v2.webp" alt="" />
                    <img src="src/carousel/tecno-camon-30-pro-tai-nghe-home.webp" alt="" />
                </Carousel>
            </section>
            <section className="smartphone-section">
                <h1 className="section-name">Điện thoại</h1>
                <div className="brand-list">
                    {uniqueBrands.map(brand => {
                        return (<Button>{brand}</Button>)
                    })}
                </div>
                <div className="products-view">
                    {cellphoneProductsElements}
                </div>                
            </section>

        </main>
    );
}
 
export default Home;