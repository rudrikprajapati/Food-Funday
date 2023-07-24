/* This code is importing the necessary modules and setting up the basic configuration for a Node.js
Express server. */
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv/config')
var port = process.env.PORT || 3100;

/* The code `app.use(function (req, res, next) { ... })` is setting up middleware for handling
Cross-Origin Resource Sharing (CORS) in the Express server. */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())
// app.listen(3100)

const roleRoutes = require('./app/routes/role.routes')
const statusRoutes = require('./app/routes/status.routes')
const userRoutes = require('./app/routes/user.routes')
const menuRoutes = require('./app/routes/menu.routes')
const foodRoutes = require('./app/routes/food.routes')
const bookTableRoutes = require('./app/routes/booktable.routes')
const orderRoutes = require('./app/routes/order.routes')
const orderfoodRouter = require('./app/routes/orderfood.routes')


app.use('/role', roleRoutes)
app.use('/status', statusRoutes)
app.use('/user', userRoutes)
app.use('/menu', menuRoutes)
app.use('/food', foodRoutes)
app.use('/book-table', bookTableRoutes)
app.use('/order', orderRoutes)
app.use('/order-food', orderfoodRouter)

//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('connected');
})

app.set('port', port);
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});