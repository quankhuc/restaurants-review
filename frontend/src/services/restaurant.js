import http from "../http-common";

// all functions for the API call
class RestaurantDataService{
    getAll(page){
        return http.get(`?page=${page}`);
    }
    get(id){
        return http.get(`/id/${id}`);
    }
    // make a find function for the search
    find(query, by = 'name', page = 0){
        return http.get(`?${by}=${query}&page=${page}`);
    }
    createReview(data){
        return http.post("/review", data);
    }
    updateReview(data){
        return http.put("/review-edit", data);
    }
    deleteReview(id, userId){
        return http.delete(`/review?id=${id}`, {data:{user_id: userId}});
    }
    getCuisines(){
        return http.get(`/cuisines`);
    }
}

export default new RestaurantDataService();