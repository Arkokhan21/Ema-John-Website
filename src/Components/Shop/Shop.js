import React, { useEffect, useState } from 'react';
import { json, Link } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0)

    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)

    const pages = Math.ceil(count / size)

    const [cart, setCart] = useState([])

    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setCount(data.count)
            })
    }, [page, size])


    const clearCart = () => {
        setCart([])
        deleteShoppingCart()
    }

    useEffect(() => {
        const storedCart = getStoredCart()
        const savedCart = []

        const ids = Object.keys(storedCart)
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id)
                    if (addedProduct) {
                        const quantity = storedCart[id]
                        addedProduct.quantity = quantity
                        savedCart.push(addedProduct)
                    }
                }
                setCart(savedCart)
            })
    }, [products])


    const addToCart = (selectedProduct) => {
        const exists = cart.find(product => product._id === selectedProduct._id)
        let newCart = []
        if (!exists) {
            selectedProduct.quantity = 1
            newCart = [...cart, selectedProduct]
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id)
            exists.quantity = exists.quantity + 1
            newCart = [...rest, exists]
        }
        setCart(newCart)
        addToDb(selectedProduct._id)
    }


    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Products key={product._id} product={product} addToCart={addToCart}></Products>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to='/orders'>
                        <button className='btn-review'>Review Order</button>
                    </Link>
                </Cart>
            </div>
            <div>
                <div className="pagination">
                    <h2>Current Page: {page}</h2>
                    {
                        [...Array(pages).keys()].map(number =>
                            <button
                                onClick={() => setPage(number)}
                                key={number}
                                className={page === number ? 'selected' : ''}>

                                {number + 1}
                            </button>)
                    }
                    <select onChange={(event) => setSize(event.target.value)}>
                        <option value="5">5</option>
                        <option selected value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Shop;