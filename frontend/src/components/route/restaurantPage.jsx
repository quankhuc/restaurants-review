import React, {useState, useEffect, useContext} from "react";
import RestaurantDataService from "../../services/restaurant.js";
import {Link, useParams} from "react-router-dom";
import UserContext from "../../context/UserContext";
import NavigationBar from "../NavigationBar.jsx";

const Restaurant = (props) => {
    // have the restaurant id so that it can display the right restaurant
    const initialRestaurantState = {
        id: null,
        address: {},
        cuisine: "",
        name: "",
        reviews: [],
    };

    const [restaurant, setRestaurant] = useState(initialRestaurantState);
    const { currentUser } = useContext(UserContext);
    const { id } = useParams();

    const getRestaurant = (id) => {
        RestaurantDataService.get(id)
            .then(response => {
                setRestaurant(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {getRestaurant(id);}, [id]);

    const deleteReview = (reviewId, index) => {
        RestaurantDataService.deleteReview(reviewId, currentUser.user_id)
            .then(() => {
                setRestaurant((prevState => {prevState.reviews.splice(index, 1); return {...prevState}}));
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <NavigationBar history={props.history}/>
            {restaurant ? (
                <div>
                    <h5>{restaurant.name}</h5>
                    <p>
                        <strong>Cuisine: </strong> {restaurant.cuisine} <br/>
                        <strong>Address: </strong> {restaurant.address.building} {restaurant.address.street},
                        {restaurant.address.zipcode}<br/>
                    </p>
                    {/*Link to add a review of the restaurants*/}
                    <Link to={"/restaurants/" + id + "/review"} className="btn btn-primary">
                        Add Review
                    </Link>
                    {/*<h4>Reviews</h4>*/}
                    <div className="row">
                        {restaurant.reviews.length > 0 ? (
                            restaurant.reviews.map((review, index) => {
                                console.log(review);
                                console.log(currentUser);
                                return (
                                    <div className="col-lg-4 pb-1" key={index}>
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text">
                                                    {review.text}<br/>
                                                    <strong>User: </strong>{review.name}<br/>
                                                    <strong>Date: </strong>{review.date}
                                                </p>
                                                {currentUser && currentUser.user_id === review.user_id &&
                                                <div className="row">
                                                    <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                                                    <Link to={{
                                                        pathname: "/restaurants/" + id + "/review",
                                                        state: {
                                                            currentReview: review
                                                        }
                                                    }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-sm-4">
                                <p>No reviews yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <br />
                    <p>No restaurant selected.</p>
                </div>
            )}
        </div>
    );
}

export default Restaurant;