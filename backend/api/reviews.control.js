import ReviewsDAO from '../dao/reviewsDAO.js'

// Reviews Control
export default class ReviewsControl{
    // Get the reviews and post them into the database. Include user info with the review.
    static async apiPostReview(req, res){
        try{
            const restaurantID = req.body.restaurant_id;
            const review = req.body.text;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date();
            const reviewResponse = await ReviewsDAO.addReviews(restaurantID, userInfo, review, date);
            // return success response
            res.status(200).json({status: 'success', data: reviewResponse});
        }
        catch (e) {
            // return error response
            res.status(500).json({status: 'error', error: e.message});
        }
    }

    // update reviews
    static async apiUpdateReview(req,res){
        try{
            const reviewID = req.body.review_id;
            const text = req.body.text;
            const date = new Date();

            const reviewResponse = await ReviewsDAO.updateReviews(
                reviewID,
                req.body.user_id,
                text,
                date);

            // catch error from the data access layer
            let {error} = reviewResponse;
            if(error){
                res.status(400).json({status: 'error', error: error});
            }
            if(reviewResponse.modifiedCount === 0) {
                throw new Error('Unable to update review - user may not have permission to edit review');
            }

            // return success response
            res.status(200).json({status: 'success', data: reviewResponse});
        }
        catch (e) {
            res.status(500).json({status: 'error', error: e.message});
        }
    }

    // delete reviews
    static async apiDeleteReview(req,res){
        try{
            const reviewID = req.query.id;
            // in real life production, not including the user_id in the request would be a security risk
            const userID = req.body.user_id;
            const reviewResponse = await ReviewsDAO.deleteReviews(reviewID, userID);

            // catch error from the data access layer
            let {error} = reviewResponse;
            if(error){
                res.status(400).json({status: 'error', error: error});
            }
            if(reviewResponse.deletedCount === 0) {
                throw new Error('Unable to delete review - user may not have permission to delete review');
            }

            // return success response
            res.status(200).json({status: 'success', data: reviewResponse});
        }
        catch (e) {
            res.status(500).json({status: 'error', error: e.message});
        }
    }
}