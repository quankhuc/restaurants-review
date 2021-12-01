import React, {useState, useEffect} from "react";
import RestaurantDataService from "../services/restaurant.service";
import {Link} from "react-router-dom";


// get a list of restaurants
const RestaurantList = (props) =>{
    const [restaurants, setRestaurants] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [searchZip, setSearchZip] = useState("");
    const [searchCuisine, setSearchCuisine] = useState("");
    const [cusines, setCuisines] = useState(["All Cuisines"]);

    useEffect(() => {
      retreiveRestaurants();
      retrieveCuseines();
    }, []);
    return (
    <div>
      <h1>Restaurant List</h1>
    </div>
  );
}

export default RestaurantList;