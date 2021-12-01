import React, { useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./components/route/Login.jsx";
import AddReview from "./components/add-reviews";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurant-list";
import Login from "./components/login";
import

function App() {
    const [currentUser, setCurrentUser] = React.useState(null);
    useEffect(() => {(async () =>{
        let user = null
        let authtoken = localStorage.getItem("authtoken")
        if (authtoken) {
            user = jwt_decode(authtoken)
        }
        setCurrentUser(user)
    })()}, [])
    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            <Router>
                <Switch>
                    <Route path = "/login" exact render={{props} => <Login  {...props} />} />
                </Switch>
            </Router>
        </UserContext.Provider>
}

export default App;