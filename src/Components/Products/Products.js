import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './Products.css'

const Products = (props) => {
    const { img, name, price, seller, ratings } = props.product
    return (
        <div className='products'>
            <img src={img} alt="" />
            <div className='products-name-price'>
                <p>{name}</p>
                <p>Price: ${price}</p>
            </div>
            <div className='products-seller-ratings'>
                <p>Manufacturer: {seller}</p>
                <p>Rating: {ratings} Stars</p>
            </div>
            <button className='btn-cart' onClick={() => props.addToCart(props.product)}>
                <p className='btn-name'>Add to Cart</p>
                <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Products;