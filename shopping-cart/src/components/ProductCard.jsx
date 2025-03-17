import React from 'react'
import '../styles/productcard.css'

const ProductCard = ({ product, handleAddToCart }) => {
    return (
        <div className='product-card'>
            <img src={product.image} alt={product.title} className='product-image' />
            <h3>{product.title}</h3>
            <p className='product-price'>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
    )
}

export default ProductCard