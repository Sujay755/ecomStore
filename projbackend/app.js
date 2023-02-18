require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
// stripe paymeny route
// const stripeRoutes = require('./routes/stripePayment')
// paypal payment route
const paymentBRoutes = require('./routes/paypalPayment');

//Middlewears

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//DB connection

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log('DB CONNECTED');
})

//ROUTES
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
//for stripe payment
// app.use("/api",stripeRoutes);
//for paypal payment
app.use("/api",paymentBRoutes);


//PORT

const port = process.env.PORT || 5000;

//server

app.listen(port, ()=>{
    console.log(`app is running at ${port}`);
})