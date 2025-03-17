import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import '../styles/productlist.css'

const ProductList = ({ handleAddToCart }) => {
    const [products, setProducts] = useState([])
    const [filterProducts, setFilterProducts] = useState([])
    const [sortOption, setSortOption] = useState('')
    const [filterOption, setFilterOption] = useState('')

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => {
                setProducts(json);
                setFilterProducts(json);
            });
    }, []);

    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        setSortOption(sortValue);

        let sortedProducts = [...filterProducts];

        if (sortValue === "price-asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === "price-desc") {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === "name-asc") {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortValue === "name-desc") {
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilterProducts(sortedProducts);
    };

    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
        setFilterOption(filterValue);

        if (filterValue) {
            setFilterProducts(products.filter((product) => product.category === filterValue));
        } else {
            setFilterProducts(products);
        }
    };

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <div className="controls">
                <select value={sortOption} onChange={handleSortChange} name="sort">
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>
                <select value={filterOption} onChange={handleFilterChange} name="filter">
                    <option value="">Filter By Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelry</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                </select>
            </div>
            <div className="prodict-list">
                {
                    filterProducts.map((product) => (
                        <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
                    )
                    )
                }
            </div>
        </div>
    )
}

export default ProductList