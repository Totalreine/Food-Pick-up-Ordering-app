const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

const userController = require('../controllers/user')

router.get('/dishes', userController.getDishes)

router.get('/dishes/:dishId', userController.getDish)

router.get('/cart', userController.getCart)

router.get('/carts/:cartId', userController.getCarts)

router.get('/carts/:addItem', userController.addItemsToCart)

router.get('/carts/:delete', userController.deletecart)

router.get('/checkout', userController.getCheckout)

router.get('/checkout/success', userController.getCheckoutSuccess)

router.get('/checkout/cancel', userController.getCheckoutCancel)

router.get('/orders', userController.getOrders)

router.post('/orders', userController.postOrders )

router.post('/cart',userController.postCart)

router.get('/orders/:orderId', userController.getOrder)

