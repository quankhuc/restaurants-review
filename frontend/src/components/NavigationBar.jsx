import { Navbar, Container } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "../context/UserContext.js";


const NavigationBar = ({history}) => {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const handleLogout = async () => {
        localStorage.removeItem("user");
        localStorage.removeItem("cuisine");
        //callback to App.js, set user state to null
        setCurrentUser(null);
        history.push("/");
    };
    return (
        <Navbar className="mb-5" bg="light" expand="lg">
            <Container>
                <a href="/">
                    <span>Need A Logo</span>
                </a>
                <Navbar.Brand href="/">Restaurant Review</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                {!currentUser && (
                    <a href="/login">
                        <button className="btn ml-2" id="login_btn">
                            Log In
                        </button>
                    </a>
                )}
                {currentUser && (
                    <button onClick={handleLogout} className="btn ml-2" id="logout_btn">
                        Log Out
                    </button>
                )}
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
