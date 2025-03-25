import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router";
import { Badge, Button, ConfigProvider, Rate } from "antd";
import { AppContext } from "../App";
import { GrAscend, GrDescend } from "react-icons/gr";
import { SlStar } from "react-icons/sl";
import { Link } from "react-router";

// Map danh mục giữa slug và API
const categoryMappings = {
    "dien-thoai": "smartphones",
    "laptop": "laptops",
    "may-tinh-bang": "tablets",
    "phu-kien": "mobile-accessories",
};
const categoryTitles = {
    "dien-thoai": "Điện thoại",
    "laptop": "Laptop",
    "may-tinh-bang": "Máy tính bảng",
    "phu-kien": "Phụ kiện",
};

// Hàm format giá tiền VND
const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(Math.round(price / 10000) * 10000).replace("₫", "đ");
};

const ProductsByCategory = () => {
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState([]);

    const allProducts = useContext(AppContext);
    const categoryToFetch = categoryMappings[category] || "";

    // Lấy giá trị từ URL
    const selectedBrand = searchParams.get("brand") || "";
    const sortOption = searchParams.get("sort") || "";
    const { items } = useContext(AppContext)

    // Lọc & Sắp xếp sản phẩm
    useEffect(() => {
        let tempProducts = items.filter(product => product.category === categoryToFetch);

        if (selectedBrand) {
            tempProducts = tempProducts.filter(p => p.brand === selectedBrand);
        }

        switch (sortOption) {
            case "price-desc":
                tempProducts.sort((a, b) => b.price - a.price);
                break;
            case "price-asc":
                tempProducts.sort((a, b) => a.price - b.price);
                break;
            case "rating":
                tempProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        setFilteredProducts(tempProducts);
    }, [categoryToFetch, selectedBrand, sortOption, allProducts]);

    // Cập nhật URL khi lọc brand
    const handleBrandFilter = (brand) => {
        const newParams = new URLSearchParams(searchParams);
        brand === selectedBrand ? newParams.delete("brand") : newParams.set("brand", brand);
        setSearchParams(newParams);
    };

    // Cập nhật URL khi sắp xếp
    const handleSort = (option) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sort", option);
        setSearchParams(newParams);
    };

    return (
        <main className="products-by-category">
            <h1 className="section-name">{categoryTitles[category] || "Danh mục"}</h1>

            {/* Bộ lọc Brand */}
            <div className="brand-filter">
                {[...new Set(filteredProducts.map(product => product.brand).filter(Boolean))].map((brand, index) => (
                    <ConfigProvider key={index} theme={{ token: { colorPrimary: '#d60019' } }}>
                        <Button
                            onClick={() => handleBrandFilter(brand)}
                        >
                            {brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()}
                        </Button>
                    </ConfigProvider>
                ))}
            </div>

            {/* Bộ lọc sắp xếp */}
            <h2>Sắp xếp theo</h2>
            <div className="filter-buttons">
                <ConfigProvider theme={{ token: { colorPrimary: '#d60019' } }}>
                    <Button
                        onClick={() => handleSort("price-desc")}
                        icon={<GrDescend />}
                        className={sortOption === "price-desc" ? "active-sort" : ""}
                    >
                        Giá cao - thấp
                    </Button>
                </ConfigProvider>

                <ConfigProvider theme={{ token: { colorPrimary: '#d60019' } }}>
                    <Button
                        onClick={() => handleSort("price-asc")}
                        icon={<GrAscend />}
                        className={sortOption === "price-asc" ? "active-sort" : ""}
                    >
                        Giá thấp - cao
                    </Button>
                </ConfigProvider>

                <ConfigProvider theme={{ token: { colorPrimary: '#d60019' } }}>
                    <Button
                        onClick={() => handleSort("rating")}
                        icon={<SlStar />}
                        className={sortOption === "rating" ? "active-sort" : ""}
                    >
                        Đánh giá
                    </Button>
                </ConfigProvider>
            </div>


            {/* Hiển thị danh sách sản phẩm */}
            <div className="products-view">
                {filteredProducts.map(product => (
                    <Badge.Ribbon
                        text={`${Math.floor(product.discountPercentage)}%`}
                        color='#d60019'
                        key={product.id}
                    >
                        <Link
                            to={`/${category}/${product.title.toLowerCase().replace(/\s+/g, "-")}`}
                            style={{ color: "black" }}
                        >
                            <div className="product-container">
                                <img src={product.images[1]} alt={product.title} />
                                <p className="product-name">{product.title}</p>
                                <p className="product-price">
                                    {formatPrice(product.price * 25000)}
                                    <span>{formatPrice(product.price * 25000 / (1 - product.discountPercentage / 100))}</span>
                                </p>
                                <div className="rating-container">
                                    <Rate
                                        value={product.rating}
                                        allowHalf
                                        disabled
                                        style={{ color: "#ffb100", fontSize: "1em", marginRight: "2px", width: "fit-content" }}
                                    />
                                    <span>{parseFloat(product.rating).toFixed(1)}</span>
                                </div>
                            </div>
                        </Link>
                    </Badge.Ribbon>
                ))}
            </div>
        </main>
    );
};

export default ProductsByCategory;
