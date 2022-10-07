import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../Components/Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../utilities/fakedb';

const Orders = () => {
    const { initialCart } = useLoaderData()

    const [cart, setCart] = useState(initialCart)

    const clearCart = () => {
        setCart([])
        deleteShoppingCart()
    }

    const handleRemoveItem = (id) => {
        const remaining = cart.filter(product => product.id !== id)
        setCart(remaining)
        removeFromDb(id)
    }

    return (
        <div>
            <div className='shop-container'>
                <div className="orders-container">
                    {
                        cart.map(product => <ReviewItem key={product.id} product={product} handleRemoveItem={handleRemoveItem}></ReviewItem>)
                    }
                    {
                        cart.length === 0 && <h2>No Items For Review. Please <Link to='/'>Shop</Link></h2>
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart} clearCart={clearCart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Orders;