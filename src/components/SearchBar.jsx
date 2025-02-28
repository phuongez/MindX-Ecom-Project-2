import { useState } from "react";
import { Input, List } from "antd";
import { Link } from "react-router";

const { Search } = Input;

const SearchBar = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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

    const handleSelectProduct = () => {
        setSearchValue(""); 
        setFilteredProducts([]); 
      };

    const handleSearch = (value) => {
    setSearchValue(value); // Cập nhật từ khóa

    if (!value.trim()) {
      setFilteredProducts([]);
      return;
    }

    // Lọc sản phẩm theo tên chứa từ khóa
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(results);
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 400, margin: "auto" }}>
      {/* Thanh tìm kiếm */}
      <Search
        placeholder="Tìm sản phẩm..."
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        allowClear
      />

      {/* Hiển thị danh sách tìm kiếm đè lên giao diện */}
      {filteredProducts.length > 0 && (
        <List
          bordered
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "white",
            zIndex: 10,
            maxHeight: 300,
            overflowY: "auto",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          dataSource={filteredProducts}
          renderItem={(item) => (
            <List.Item>
                <Link 
                    to={`/${convertCategoryToSlug(item.category)}/${convertToSlug(item.title)}`} 
                    style={{ width: "100%" }}
                    onClick={handleSelectProduct}
                >
                {item.title}
              </Link>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default SearchBar;
