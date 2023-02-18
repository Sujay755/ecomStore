import React from 'react'
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import ManageCategories from './admin/ManageCategories'
import ManageProducts from './admin/ManageProducts'
import UpdateCategory from './admin/UpdateCategory'
import UpdateProduct from './admin/UpdateProduct'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import Cart from './core/Cart'
import Home from './core/Home'
import AdminDashboard from './user/AdminDashBoard'
import Signin from './user/Signin'
import Signup from './user/Signup'
import UserDashboard from './user/UserDashBoard'

const Routess = () => {
  return (
    
    <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/user/dashboard" element={<PrivateRoute><UserDashboard/></PrivateRoute>} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
            <Route path="/admin/create/category" element={<AdminRoute><AddCategory/></AdminRoute>} />
            <Route path="/admin/categories" element={<AdminRoute><ManageCategories/></AdminRoute>} />
            <Route path="//admin/category/update/:categoryId" element={<AdminRoute><UpdateCategory/></AdminRoute>} />
            <Route path="/admin/create/product" element={<AdminRoute><AddProduct/></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><ManageProducts/></AdminRoute>} />
            <Route path="/admin/product/update/:productId" element={<AdminRoute><UpdateProduct/></AdminRoute>} />
            
        </Routes>
    </Router>
  )
}

export default Routess;
