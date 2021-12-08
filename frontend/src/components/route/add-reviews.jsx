import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import UserContext from '../../context/UserContext';
import RestaurantDataService from "../../services/restaurant.js";


function AddReview(props){
    const { currentUser } = useContext(UserContext);
    let editing = false;
    let initialReviewState = "";
    if(props.location.state && props.location.state.currentReview){
        editing = true;
        initialReviewState = props.location.state.currentReview.text;
    }
    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) =>{
        setReview(event.target.value);
    }

    const saveReview = () => {
        console.log(currentUser);
        let data = {
            text: review,
            name: currentUser.username,
            user_id: currentUser.user_id,
            restaurant_id: props.match.params.id,
        };

        if(editing){
            data.review_id = props.location.state.currentReview._id;
            console.log(props.location.state.currentReview);
            RestaurantDataService.updateReview(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else{
            console.log(data);
            RestaurantDataService.createReview(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <div>
            {currentUser ? (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <Link to={"/restaurants/" + props.match.params.id}>
                            <button>Back to Restaurant</button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="description">{editing ? "Edit" : "Create"}</label>
                            <input type='text'
                                   className="form-control"
                                   id="description"
                                   value={review}
                                   onChange={handleInputChange}
                                   name="text"
                            />
                        </div>
                        <button onClick={saveReview} className="btn btn-success">Submit</button>
                    </div>
                )}
            </div>) : (
                <div>
                    <h4>You must be logged in to submit a review</h4>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default AddReview;