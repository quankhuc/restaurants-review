import RestaurantsDAO from "../dao/restaurantsDAO.js"


// codes that uses the DAO are seperated from the data access layer mechanism
export default class RestaurantsControl{
    static async apiGetRestaurants(req,res){
        // create query string from query in the url, default for restaurants is 10, default for page is 0
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filter = {};
        if (req.query.name){
            filter.name = req.query.name;
        }
        else if(req.query.cuisine){
            filter.cuisine = req.query.cuisine;
        }
        else if(req.query.borough){
            filter.borough = req.query.borough;
        }
        else if(req.query.street){
            filter.street = req.query.street;
        }
        else if(req.query.zipcode){
            filter.zipcode = req.query.zipcode;
        }

        // get the return from the DAO
        const {restaurantsList, totalRestaurants} = await RestaurantsDAO.getRestaurants({
            filter,
            page,
            restaurantsPerPage});
        // create a response object
        let response = {
            restaurants: restaurantsList,
            page: page,
            filter: filter,
            entries_per_page: restaurantsPerPage,
            total_results: totalRestaurants,
        }
        // return the response as json format
        res.json(response);
    }

    // get the restaurant by id
    static async apiGetRestaurantById(req,res){
        try{
            let id = req.params.id;
            let restaurant = await RestaurantsDAO.getRestaurantById(id);
            if(!restaurant){
                res.status(404).json({error: "Not Found"});
                return;
            }
            res.json(restaurant);
        }
        catch (e){
            res.status(500).json({error: e});
        }
    }

    // get restaurant by cuisine
    static async apiGetRestaurantCuisines(req, res){
        try{
            let cuisines = await RestaurantsDAO.getCuisines();
            res.json(cuisines);
        }
        catch (e){
            console.error(e);
            res.status(500).json({error: e});
        }
    }
}