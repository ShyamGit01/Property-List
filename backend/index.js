const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT, 
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
    console.log("Connected to db...");
})

// Import router
const listingRouter = require("./routes/listing");

// Middleware
app.use(express.json());

// route Middleware
app.use("/api/listings", listingRouter);

const port = 3000
app.listen(port, () => {
    console.log('               Server listening')
    console.log('==================================================')
    console.log(`1. baseurl    http://localhost:${port}`);
    console.log(`2. api        http://localhost:${port}/api/listings/`);
    console.log('==================================================')
    
})