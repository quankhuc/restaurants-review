import http from "../http-common";

class UserService {
    login(data) {
        return http.post("/login", data);
    }
    register(data){
        return http.post("/register", data);
    }
    getUser(data){
        return http.get("/user", data);
    }
    logout(data){
        return http.post("/logout", data);
    }
}

export default new UserService();