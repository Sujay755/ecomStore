const express = require('express');
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');
const {getUserById,pushOrderInPurcaseList} = require('../controllers/user');
const {updateStock} = require('../controllers/product');

const {getOrderById, createOrder, getAllOrders, updateOrderStatus, getOrderStatus} = require('../controllers/order');

//params
router.param('userId',getUserById);
router.param('orderId',getOrderById);

//actual routes
//create
router.post('/order/create/:userId',isSignedIn,isAuthenticated,pushOrderInPurcaseList,updateStock,createOrder);

//read
router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders)

//status for order
router.get('/order/status/:userId',isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put('/order/:orderId/status/:userId',isSignedIn,isAuthenticated,isAdmin,updateOrderStatus)


module.exports = router;