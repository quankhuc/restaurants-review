import React, {useState, useEffect} from "react";
import RestaurantDataService from "../services/restaurant.service";

const Restaurant = (props) => {
    // have the restaurant id so that it can display the right restaurant
    const initialRestaurantState = {
        id: null,
        name: "",
        address: {},
        cuisine: "",
        reviews: [],
    };
    const [restaurant, setRestaurant] = useState(initialRestaurantState);

    const getRestaurant = id => {

    }

    useEffect(() => {getRestaurant(props.match.params.id);}, [props.match.params.id]);
}

export default Restaurant;