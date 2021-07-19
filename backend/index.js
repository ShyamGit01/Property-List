const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT, 
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
    console.log("Connected to db...");
})

// Swagger config
const swaggerAPIDesc = swaggerJsDoc({
    swaggerDefinition: {
        info: {
            title: "Propery listing",
            version: "1.0.0"
        }
    },
    apis: ['index.js']
})

/**
 * @swagger
 * /api/listings:
 *  get:
 *      description: this apl will get all the property listed
 *      responses:
 *          200:
 *              description: Data fetch successfully
 *          400:
 *              description: Error while fetching data 
 */



// Import router
const listingRouter = require("./routes/listing");
const userRouter = require("./routes/user")

// Middleware
app.use(express.json());
app.use(cors());


// route Middleware
app.use("/api/listings", listingRouter);
app.use("/api/users", userRouter);
app.use('/apidoc', swaggerUI.serve, swaggerUI.setup(swaggerAPIDesc));


const port = 3000
app.listen(port, () => {
    console.log('               Server listening')
    console.log('==================================================')
    console.log(`1. baseurl         http://localhost:${port}`);
    console.log(`2. Listing api     http://localhost:${port}/api/listings/`);
    console.log(`3. User api        http://localhost:${port}/api/users/`);
    console.log(`4. api docs        http://localhost:${port}/apidoc`);
    console.log('==================================================')
    
})