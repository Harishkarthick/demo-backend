const express = require('express');
const router = express.Router();
let Controller = require('../controller')
router.get('/', async (req, res) => {
    console.log('11111111111')
    res.send({message: 'Api is running'})
})

router.post('/listRestaurants', Controller.RestaurantsController.listRestaurants)

module.exports = router