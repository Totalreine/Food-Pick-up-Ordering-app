const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

const restaurantController = require('../controllers/restaurant')

router.get('/dishes', restaurantController.getDishes)

router.get('/dishes/:dishId', restaurantController.getDish)

router.get('/add-dish', restaurantController.getAddDish)

router.get('/edit-dish/:dishId', restaurantController.getEditDish)

router.post('/add-dish', restaurantController.postAddDish)

router.post('/edit-dish', restaurantController.postEditDish)

router.post('/delete-dish', restaurantController.deleteDish)

module.exports = router