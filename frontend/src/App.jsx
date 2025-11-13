// src/App.jsx
import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import Sustainability from './pages/Sustainability'
import About from './pages/About'
import BestSellers from './pages/BestSellers'
import Offers from './pages/Offers'
import FAQs from './pages/FAQs'
import DeliveryInfo from './pages/DeliveryInfo'
import Returns from './pages/Returns'
import PaymentMethods from './pages/PaymentMethods'
import TrackOrder from './pages/TrackOrder'
import Contact from './pages/Contact'

import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'

const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller')
  const { showUserLogin, isSeller } = useAppContext()

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}

      <Toaster />
      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          {}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/about" element={<About />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/help/delivery" element={<DeliveryInfo />} />
          <Route path="/help/returns" element={<Returns />} />
          <Route path="/help/payments" element={<PaymentMethods />} />
          <Route path="/help/track" element={<TrackOrder />} />
          <Route path="/contact" element={<Contact />} />

          {}
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            {isSeller && (
              <>
                <Route index element={<AddProduct />} />
                <Route path="product-list" element={<ProductList />} />
                <Route path="orders" element={<Orders />} />
              </>
            )}
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
