import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/route/Login.jsx";
import AddReview from "./components/route/add-reviews.jsx";
import Restaurant from "./components/route/restaurantPage.jsx";
import RestaurantsList from "./components/route/Home.jsx";
import UserContext from "./context/UserContext.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/route/Register.jsx";
import Logout from "./components/route/Logout.jsx";


function App() {
    const [currentUser, setCurrentUser] = React.useState(null);
    useEffect(() => {(async () =>{
        const user = localStorage.getItem("authtoken")
        // if there is an authkey, user is still logged in
        if (user !== 'undefined') {
            // TODO: Need to get user from backend
            setCurrentUser(user);
        }
        else{
            console.log("wrong token/ not logged in")
        }
    })()}, [])
    return (
        <section className="HomePage">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/" className="navbar-brand">
                    NEED TO HAVE A LOGO
                </a>
                <div className="navbar-nav">
                    <li className="nav-item">
                        <a href={"/restaurants"} className="nav-link">Home</a>
                    </li>
                    <li className="nav-item mr-auto">
                        {currentUser ?
                            (<a href={"/logout"} className="nav-link">Logout</a>) :
                            (<a href={"/login"} className="nav-link">Login</a>)
                        }
                    </li>
                </div>
            </nav>
            <div className="content">
                <UserContext.Provider value={{currentUser, setCurrentUser}}>
                    <Router>
                        <Switch>
                            <Route path={["/", "/restaurants"]} exact render={(props) => <RestaurantsList {...props} />} />
                            <Route path="/restaurants/:id/review" exact render={(props) => <AddReview {...props}/>} />
                            <Route path="/restaurants/:id" exact render={(props) => <Restaurant {...props} />} />
                            <Route path="/login" exact render={(props) => <Login {...props} />} />
                            <Route path="/register" exact render={(props) => <Register {...props} />} />
                            <Route path="/logout" exact render={(props) => <Logout {...props} />} />
                        </Switch>
                    </Router>
                </UserContext.Provider>
            </div>
        </section>)

}

export default App;