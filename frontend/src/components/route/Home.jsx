import React, {useState, useEffect} from "react";
import RestaurantDataService from "../../services/restaurant.js";
import {Link} from "react-router-dom";


// get a list of restaurants
const RestaurantList = () =>{
    const [restaurants, setRestaurants] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchZip, setSearchZip] = useState("");
    const [searchCuisine, setSearchCuisine] = useState("");
    const [cuisines, setCuisines] = useState(["All Cuisines"]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page_cuisine, setPageCuisine] = useState(0);
    const [totalPagesCuisine, setTotalPagesCuisine] = useState(0);
    const [page_name, setPageName] = useState(0);
    const [totalPagesName, setTotalPagesName] = useState(0);
    const [page_zip, setPageZip] = useState(0);
    const [totalPagesZip, setTotalPagesZip] = useState(0);

    // make a useeffect to render the next page of the restaurant list


    useEffect(() => {retrieveRestaurants(); retrieveCuisines()}, []);
    const onChangeSearchName = (e) => {
        setSearchName(e.target.value);
    };
    const onChangeSearchZip = (e) => {
        setSearchZip(e.target.value);
    };
    const onChangeSearchCuisine = (e) => {
        setSearchCuisine(e.target.value);
    }
    const retrieveRestaurants = () => {
        console.log(cuisines);
        RestaurantDataService.getAll(page)
            .then(response => {
                console.log(response.data);
                setRestaurants(response.data.restaurants);
                setTotalPages(Math.ceil(response.data.total_results/10));
            })
            .catch(e => {
                console.log(e);
            });
    };
    const retrieveCuisines = () => {
        RestaurantDataService.getCuisines()
            .then(response => {
                console.log(response.data);
                setCuisines(["All Cuisines"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    };
    const refreshList = () => {
        if (cuisines === ["All Cuisines"]) {
            retrieveRestaurants();
        } else {
            retrieveCuisines();
        }
    };
    const find = (query, by, page) => {
        RestaurantDataService.find(query, by, page)
            .then(response => {
                console.log(response.data);
                setRestaurants(response.data.restaurants);
                console.log(restaurants);
                setTotalPages(Math.ceil(response.data.total_results/10));
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        find(searchName, "name", page_name);
    };

    const findByZip = () => {
        find(searchZip, "zipcode")
    };

    const findByCuisine = () => {
        if (searchCuisine === "All Cuisines") {
            refreshList();
        } else {
            setSearchCuisine(searchCuisine);
            find(searchCuisine, "cuisine", page);
        }
    };

    const nextPage = () => {
        const page = page + 1;
        if(searchCuisine){
            if (page < totalPages) {
                findByCuisine();
            }
        }
        else if(searchName){
            if (page_name < totalPages) {
                setPageName(page_name + 1);
                findByName();
            }
        }
        retrieveRestaurants()
    }
    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
            retrieveRestaurants();
        }
    }

    return (
        <div>
            <div className="row pb-1">
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by zip"
                        value={searchZip}
                        onChange={onChangeSearchZip}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByZip}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="input-group col-lg-4">
                    <select onChange={onChangeSearchCuisine}>
                        {cuisines.map(cuisine => {
                            return (
                                <option value={cuisine}> {cuisine.substr(0, 20)} </option>
                            )
                        })}
                    </select>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByCuisine}
                        >
                            Search
                        </button>
                    </div>

                </div>
            </div>
            <div className="row">
                {restaurants.map((restaurant) => {
                    const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">
                                        <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                                        <strong>Address: </strong>{address}
                                    </p>
                                    <div className="row">
                                        <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            View Reviews
                                        </Link>
                                        <a href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="page-traverse">
            {/*    TODO: Create 2 btns to traverse pages*/}
                <button className="next-page" onClick={nextPage} type="button">Next Page</button>
                <button className="prev-page" onClick={prevPage} type="button">Previous Page</button>
            </div>
        </div>
    );
}

export default RestaurantList;