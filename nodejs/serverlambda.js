const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const  DataAccessLayer= require('./dataaccesslayer');

const dalObj = new DataAccessLayer();


const port = process.env.PORT || 8000

let instance = express();

instance.use(bodyParser.json());

instance.use(bodyParser.urlencoded({ extended: false }));

instance.use(cors())





instance.post('/user/register', dalObj.registerUser);

instance.post('/user/checkUniqueEmail', dalObj.isUniqueEmail);


instance.post('/user/authuser', dalObj.loginUser);

instance.get('/products/categories', dalObj.getCategories);

instance.get('/products/categories/:categoryId', dalObj.getItems);

instance.post('/products/placeOrder', dalObj.placeOrder);

instance.post('/products/placeOrders', dalObj.placeOrders);

instance.get('/products/getOrders/:email', dalObj.getOrders)


// 4. listen on the port
instance.listen(port, () => {
    console.log(`Express Server Started on port ${port}`);
});


module.exports = instance;