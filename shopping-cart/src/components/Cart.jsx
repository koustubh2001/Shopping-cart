import React, { useState } from "react";
import '../styles/cart.css'
import { BsCheckCircle } from 'react-icons/bs'
import { motion, AnimatePresence } from 'framer-motion'


const Cart = ({ cartItems, handleRemoveFromCart }) => {
    const [showPaymentGateway, setShowPaymentGateway] = useState(false)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [cardNumber, setCardNumber] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvv, setCvv] = useState("")
    const [errors, setErrors] = useState({})

    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0)


    const handleProceedCheckout = () => {
        setShowPaymentGateway(true)
    }

    const handlePayment = () => {
        const newErrors = {}
        if (!/^[0-9]{16}$/.test(cardNumber)) newErrors.cardNumber = "Invalid card number"
        if (!/^(0[1-9]|[0-2])\/([0-9]{2})$/.test(expiryDate)) newErrors.expiryDate = "Invalid expiry date"

        if (!/^[0-9]{3}$/.test(cvv)) newErrors.cvv = "Invalid cvv"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            setErrors({})
            setPaymentSuccess(true)
            setTimeout(() => {
                setPaymentSuccess(false)
                setShowPaymentGateway(false)
                setCardNumber("")
                setCvv('')
                setExpiryDate("")

            }, 2000)
        }
    }
    return (
        <div className="cart-page">
            <h2 className="cart-title">Your Cart</h2>
            {
                cartItems.length === 0 ? (
                    <p className="empty-cart-message">Your cart is empty</p>
                ) : (
                    <>
                        <div className="cart-items-container">
                            {
                                cartItems.map((item) => (
                                    <div className="cart-item" key={item.id}>
                                        <img src={item.image} alt={item.title} className="cart-item-image" />
                                        <div className="cart-item-details">
                                            <h4 className="cart-item-title">{item.title}</h4>
                                            <p className="cart-item-price">${item.price.toFixed(2)}</p>
                                            <button onClick={() => handleRemoveFromCart(item.id)} className="remove-btn">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="cart-total">
                            <h3>Total : ${totalAmount.toFixed(2)}</h3>
                            <button className="checkout-btn" onClick={handleProceedCheckout}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )
            }
            {
                showPaymentGateway && (
                    <div className="payment-gateway">
                        <div className="payment-modal">
                            <h2>Payment gateway</h2>
                            <p>Total amount : ${totalAmount.toFixed(2)}</p>
                            <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength={16} className={`payment-input ${errors.cardNumber ? "input-error" : ""}`} name="" id="" />
                            {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
                            <input type="text" placeholder="ExpiryDate(MM/YY)" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className={`payment-input ${errors.expiryDate ? "input-error" : ""}`} name="" id="" />
                            {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}
                            <input type="text" placeholder="CVV" maxLength="3" value={cvv} onChange={(e) => setCvv(e.target.value)} className={`payment-input ${errors.cvv ? "input-error" : ""}`} name="" id="" />
                            {errors.cvv && <p className="error-message">{errors.cvv}</p>}
                            <button className="confirm-btn" onClick={handlePayment}>
                                Confirm Payment
                            </button>
                            <button className="cancel-btn" onClick={() => setShowPaymentGateway(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }
            <AnimatePresence>
                {
                    paymentSuccess && (
                        <motion.div className="payment-success" initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.5 }}>
                            <BsCheckCircle size={100} color="green" />
                            <h2>Payment successful</h2>

                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

export default Cart