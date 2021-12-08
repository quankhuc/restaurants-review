import React, {useState, useEffect} from "react";
import RestaurantDataService from "../../services/restaurant.js";
import {Link} from "react-router-dom";
import NavigationBar from "../NavigationBar.jsx";


const RestaurantList = (props) =>{
    const [restaurants, setRestaurants] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchZip, setSearchZip] = useState("");
    const [searchCuisine, setSearchCuisine] = useState("");
    const [cuisines, setCuisines] = useState(["All Cuisines"]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page_cuisine, setPageCuisine] = useState(0);
    const [page_name, setPageName] = useState(0);
    const [page_zip, setPageZip] = useState(0);

    useEffect(() =>{refreshList(); retrieveCuisines()}, [page]);
    useEffect(() => {findByCuisine()},[searchCuisine, page_cuisine]);
    useEffect(() => {findByZip()}, [searchZip, page_zip]);
    useEffect(() => {findByName()}, [searchName, page_name]);
    const onChangeSearchName = (e) => {
        setPageName(0);
        setSearchName(e.target.value);
    };
    const onChangeSearchZip = (e) => {
        setPageZip(0);
        setSearchZip(e.target.value);
    };
    const onChangeSearchCuisine = (e) => {
        console.log("here");
        localStorage.setItem("cuisine", e.target.value);
        setPageCuisine(0);
        findByCuisine();
    }
    const retrieveRestaurants = () => {
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
                setCuisines(["All Cuisines"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    };
    const refreshList = () => {
        if(localStorage.getItem("cuisine") !== "All Cuisines"){
            find(localStorage.getItem("cuisine"), "cuisine", page_cuisine);
        }
        else {
            retrieveRestaurants()
        }
    };
    const find = (query, by, page) => {
        RestaurantDataService.find(query, by, page)
            .then(response => {
                console.log(response.data);
                setRestaurants(response.data.restaurants);
                setTotalPages(Math.floor(response.data.total_results/10));
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        find(searchName, "name", page_name);
    };

    const findByZip = () => {
        console.log(page_zip);
        find(searchZip, "zipcode",page_zip);
    };

    const findByCuisine = () => {
        let searchCuisine_local = localStorage.getItem("cuisine");
        if (searchCuisine_local === "All Cuisines") {
            refreshList();
        } else {
            setSearchCuisine(searchCuisine_local);
            find(searchCuisine_local, "cuisine", page_cuisine);
        }
    };

    const nextPage = () => {
        console.log(searchZip);
        if((searchCuisine !== "All Cuisines" || searchCuisine !== "") && searchName === "" && searchZip === "" &&
            page_cuisine < totalPages){
            setPageCuisine(page_cuisine + 1);
        }
        else if(searchName && page_name < totalPages){
            setPageName(page_name + 1);
        }
        else if(searchZip && page_zip < totalPages){
            setPageZip(page_zip + 1);
        }
        else if(page < totalPages){
            setPage(page + 1);
        }
    }
    const prevPage = () => {
        if((searchCuisine !== "All Cuisines" || searchCuisine !== "") && searchName === "" && searchZip === "" &&
            page_cuisine !== 0){
            setPageCuisine(page_cuisine - 1);
        }
        else if (searchName && page_name !== 0){
            setPageName(page_name - 1);
        }
        else if (searchZip && page_zip !== 0){
            setPageZip(page_zip - 1);
        }
        else if (page !== 0){
            setPage(page - 1);
        }
    }

    return (
        <div>
            <NavigationBar history={props.history}/>
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
                            let select = false;
                            if(cuisine === localStorage.getItem("cuisine")){
                                select = true;
                            }
                            return (
                                <option value={cuisine} selected={select}> {cuisine.substr(0, 20)} </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="row">
                {restaurants ? (restaurants.map((restaurant) => {
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
                })):(
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">No restaurants found</h5>
                            </div>
                        </div>
                    </div>)
                }
                <div className="page-traverse">
                    {restaurants.length ? (
                        <div>
                            <button className="next-page" onClick={nextPage} type="button">Next Page</button>
                            <button className="prev-page" onClick={prevPage} type="button">Previous Page</button>
                        </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
}

export default RestaurantList;