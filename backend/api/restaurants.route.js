import express from "express"
import RestaurantControl from "./restaurants.control.js"
import ReviewControl from "./reviews.control.js"
import UserControl from "./user.control.js"

const router = express.Router()
router.route("/").get(RestaurantControl.apiGetRestaurants)
// get a specific restaurant and its reviews
router.route("/id/:id").get(RestaurantControl.apiGetRestaurantById)
// get a list of cuisine to create a drop down menu at frontend
router.route("/cuisines").get(RestaurantControl.apiGetRestaurantCuisines)
//create route for people to post/put/delete reviews
router
    .route("/review")
    .post(ReviewControl.apiPostReview)
    .put(ReviewControl.apiUpdateReview)
    .delete(ReviewControl.apiDeleteReview)
router
    .route("/login")
    .post(UserControl.apiLoginPostUser)
router
    .route("/register")
    .post(UserControl.apiRegisterPostUser)
router
    .route("/logout")
    .post(UserControl.apiLogoutPostUser)
export default router