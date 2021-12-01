import mongodb from "mongodb"
// convert mongodb string to object id
const ObjectId = mongodb.ObjectID;
// create a reference restaurants to the DB
let restaurants

export default class RestaurantsDAO{
    static async injectDB(connection) {
        // check if the reference is already filled
        if (restaurants) {
            console.log("RestaurantsDAO already exists")
            return
        }
        // if the reference is not filled, connect to the database and retrieve collection "restaurants", which contains
        // all reviews of restaurants
        try {
            restaurants = await connection.db(process.env.RESTREVIEWS_NS).collection('restaurants')
        }
        catch (err){
            console.log(`Unable to create a collection handle connection in restaurantsDAO: ${err}`)
        }
    }

    // create an async function to retrieve all restaurants
    static async getRestaurants({
        // create a filter parameter to filter restaurants by name, borough, street, zipcode, and cuisine
        filter = null,
        // start at the first page
        page = 0,
        // return 10 restaurants per page
        restaurantsPerPage = 10} = {})
    {
        let query
        if(filter){
            if("name" in filter){
                // search all restaurants with the name typed into the filter in the database
                query = {$text: {$search: filter["name"]}}
            }
            else if("cuisine" in filter){
                // put the name of the cuisine wanted to be found in the filter and find all restaurants with
                // that cuisine
                query = {"cuisine": {$eq: filter["cuisine"]}}
            }
            else if("borough" in filter){
                // put the name of the borough wanted to be found in the filter and find all restaurants with
                // that borough
                query = {"borough": {$eq: filter["borough"]}}
            }
            else if("street" in filter){
                // put the name of the street wanted to be found in the filter and find all restaurants with
                // that street
                query = {"address.street": {$eq: filter["street"]}}
            }
            else if("zipcode" in filter){
                // put the name of the zipcode wanted to be found in the filter and find all restaurants with
                // that zipcode
                query = {"address.zipcode": {$eq: filter["zipcode"]}}
            }
        }
        let cursor
        try{
            cursor = await restaurants.find(query)
        }
        catch(err){
            console.error(`Unable to issue the command, ${err}`)
            return {restaurants: [], totalRestaurants: 0}
        }
        // when the command is valid, return the cursor with the restaurants found
        const displayCursor = cursor.limit(restaurantsPerPage).skip(page * restaurantsPerPage)
        try {
            // return the cursor into an array
            const restaurantsList = await displayCursor.toArray()
            // return the total number of restaurants found
            const totalRestaurants = await restaurants.countDocuments(query)
            return {restaurantsList, totalRestaurants}
        }
        catch (err){
            console.error(`Unable to convert restaurants into a list, ${err}`)
            return {restaurants: [], totalRestaurants: 0}
        }
    }

    // get restaurant by id
    static async getRestaurantById(id){
        try{
            const pipeline =[{
                $match: {_id: ObjectId(id)},
            },{
                $lookup:{
                    from: "reviews",
                    let: {id: "$_id",
                    },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ["$restaurant_id", "$$id"],
                            },
                        },
                    },{
                        $sort: {
                            date: -1,
                        },
                    },
                    ],
                    as: "reviews",
                },
            },
                {
                    $addFields: {
                        reviews: "$reviews",
                    },
                },
            ]
            return await restaurants.aggregate(pipeline).next();
        }
        catch (e) {
            console.error(`Unable to get restaurant by id, ${e}`)
            throw e;
        }
    }

    // get Cuisines
    static async getCuisines(){
        let cuisines = []
        try{
            // get unique cuisines from the database
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        }
        catch(err){
            console.error(`Unable to get cuisines, ${err}`)
            return cuisines
        }
    }
}