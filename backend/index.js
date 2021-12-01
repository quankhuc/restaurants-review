import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js";

// load environment variables
dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000
MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
    // limit the number of connections to the database to 50 and timeout after 5 seconds
    maxPoolSize: 50,
    wtimeoutMS: 5000,
    useNewUrlParser: true,
})
    .catch(err => {
        // return error if connection fails
        console.log(err.stack)
        process.exit(1)
    })
    .then(async client =>{
        // get the initial the reference to the database
        await RestaurantsDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        //start server
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    })