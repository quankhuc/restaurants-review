import http from "../http-common";

// all functions for the API call
class RestaurantDataService{
    getAll(page = 0){
        return http.get(`?page=${page}`);
    }
    get(id){
        return http.get(`/id/${id}`);
    }
    // make a fidn function for the search
    find(query, by = 'name', page = 0){
        return http.get(`?${by}=${query}&page=${page}`);
    }
    createReview(data){
        return http.post("/review", data);
    }
    updateReview(data){
        return http.put("/review", data);
    }
    deleteReview(id){
        return http.delete(`/review/${id}`);
    }
    getCuisines(id){
        return http.get(`/cuisine/${id}`);
    }
}