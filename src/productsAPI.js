export const getAllProducts = () => {
    return fetch("https://dummyjson.com/products?limit=0")
}

export const getByCategory = (category) => {
    return fetch(`https://dummyjson.com/products/category/${category}`)
}