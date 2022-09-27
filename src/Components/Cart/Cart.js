import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const { cart } = props
    let totalPrice = 0
    let totalShippingCharge = 0
    let quantity = 0
    for (const product of cart) {
        quantity = quantity + product.quantity
        totalPrice = totalPrice + product.price * product.quantity
        totalShippingCharge = totalShippingCharge + product.shipping
    }

    const tax = parseFloat((totalPrice * 0.1).toFixed(2))

    const grandTotal = totalPrice + totalShippingCharge + tax

    return (
        <div className='cart'>
            <h2>Order Summary</h2>
            <h4>Selected Items: {quantity}</h4>
            <h4>Total Price: ${totalPrice}</h4>
            <h4>Total Shipping Charge: ${totalShippingCharge}</h4>
            <h4>Tax: ${tax}</h4>
            <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
        </div>
    );
};

export default Cart;