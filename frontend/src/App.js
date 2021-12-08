import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/route/Login.jsx";
import AddReview from "./components/route/add-reviews.jsx";
import Restaurant from "./components/route/restaurantPage.jsx";
import RestaurantsList from "./components/route/Home.jsx";
import UserContext from "./context/UserContext.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/route/Register.jsx";


function App() {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {(async () =>{
        const temp = localStorage.getItem("user");
        const user = JSON.parse(temp);
        // if there is an authkey, user is still logged in
        if (user !== null) {
            // TODO: Need to get user from backend
            setCurrentUser(user);
        }
        else{
            console.log("wrong token/ not logged in")
        }
    })()}, [])
    return (
            <div className="content">
                <UserContext.Provider value={{currentUser, setCurrentUser}}>
                    <Router>
                        <Switch>
                            <Route path={["/", "/restaurants"]} exact render={(props) => <RestaurantsList {...props} />} />
                            <Route path="/restaurants/:id/review" exact render={(props) => <AddReview {...props}/>} />
                            <Route path="/restaurants/:id" exact render={(props) => <Restaurant {...props} />} />
                            <Route path="/login" exact render={(props) => <Login {...props} />} />
                            <Route path="/register" exact render={(props) => <Register {...props} />} />
                        </Switch>
                    </Router>
                </UserContext.Provider>
            </div>
    );
}

export default App;