import mongodb from "mongodb"
// convert mongodb string to object id
const ObjectId = mongodb.ObjectID

let reviews;

export default class reviewsDAO {

    // function to inject data into collection
    static async injectDB(connection) {
        if (reviews){return}
        try {
            reviews = await connection.db(process.env.RESTREVIEWS_NS).collection("reviews");
        } catch (e) {
            console.error(`Unable to establish connection to reviews collection using reviewDAO: ${e}`);
        }
    }

    // function to add reviews
    static async addReviews(restaurantID, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantID),
            }
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to add review using reviewDAO: ${e}`);
            return {error: e};
        }
    }

    // function to update reviews
    static async updateReviews(reviewID, userID, text, date) {
        try {
            // update the database using the updateOne function provided by mongodb
            return await reviews.updateOne(
                {user_id: userID, _id: ObjectId(reviewID)},
                {$set: {text: text, date: date}}
            );
        }
        catch (e) {
            console.error(`Unable to update review using reviewDAO: ${e}`);
            return {error: e};
        }
    }

    // function to delete reviews
    static async deleteReviews(reviewID, userID) {
        try {
            // update the database using the updateOne function provided by mongodb
            return await reviews.deleteOne(
                {user_id: userID, _id: ObjectId(reviewID)}
            );
        }
        catch (e) {
            console.error(`Unable to delete review using reviewDAO: ${e}`);
            return {error: e};
        }
    }
}
