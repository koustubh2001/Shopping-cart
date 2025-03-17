import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const saveCart = JSON.parse(localStorage.getItem('cartItems')) || []
    setCartItems(saveCart)
  }, [])

  const handleAddToCart = (product) => {
    const updateCart = [...cartItems, product]
    setCartItems(updateCart)
    localStorage.setItem("cartItems", JSON.stringify(updateCart))
  }
  const handleRemoveFromCart = (productId) => {
    const updateCart = cartItems.filter(item => item.id !== productId)
    setCartItems(updateCart)
    localStorage.setItem('cartItems', JSON.stringify(updateCart))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCartItems([])
    localStorage.removeItem('cartItems')
    localStorage.removeItem('isLoggedIn')
  }
  return (
    <GoogleOAuthProvider clientId="379580024705-pblqp25dv58br8mugemaf1k6uqt4go4f.apps.googleusercontent.com">
      <
        Router
      >
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          {
            isLoggedIn ? (
              <>
                <Route path="/" element={<ProductList handleAddToCart={handleAddToCart} />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />} />
                <Route path="/checkout" element="checkout products" />
              </>
            ) : (
              <Route
                path="*"
                element={
                  <div className='login-container'>
                    <div className='login-card'>
                      <h2>Welcome! Please sign in  to continue</h2>
                      <div className='google-login-wrapper'>
                        <GoogleLogin
                          onSuccess={credentialResponse => {
                            setIsLoggedIn(true)
                            localStorage.setItem('isLoggedIn', 'true')
                          }}
                          onError={() => {
                            console.log('Login Failed');
                          }}
                        />
                      </div>
                    </div>

                  </div>
                }
              />
            )
          }

        </Routes>
        <Footer />
      </Router>
    </GoogleOAuthProvider>

  )
}

export default App
