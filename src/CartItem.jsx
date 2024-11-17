import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all items
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', ''));
      return total + (cost * item.quantity);
    }, 0).toFixed(2);
  };

  // Calculate total cost for individual item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', ''));
    return (cost * item.quantity).toFixed(2);
  };

  // Handle increment button click
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  // Handle decrement button click
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item));
    }
  };

  // Handle remove button click
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Handle continue shopping button click
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // Handle checkout button click
  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img 
              className="cart-item-image" 
              src={item.image} 
              alt={item.name} 
            />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-cost">{item.cost}</p>
              <div className="cart-item-quantity">
                <button 
                  className="quantity-btn"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <p className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </p>
              <button 
                className="delete-btn"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-actions">
        <button 
          className="continue-shopping-btn"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <button 
          className="checkout-btn"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;