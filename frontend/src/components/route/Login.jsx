import {useState, useContext} from 'react';
import UserService from '../../services/login.js';
import UserContext from '../../context/UserContext';


function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const handleLoginUser = async() => {
        try{
            const data = {
                username: username,
                password: password
            }
            const res = await UserService.login(data);
            // set current user
            // set everything in local storage. In the future, I need to encode the info stored in the local storage
            localStorage.setItem('authtoken', res.data);
            if (res.data.user_id && res.data.status === 'success') {
                //callback to App.js
                setCurrentUser({data: {
                    user_id: res.data.user_id,
                    username: res.data.username,
                    email: res.data.email,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,}});
                if (parseInt(res.status) === 200) {
                    alert('Login successful');
                    props.history.push('/');
                }
            }
        }
        catch(e){
            if(e.response.status === 400){
                alert(e.response.data.message);
            }
            console.log(e);
        }
    }
    return (
        <div>
        <img src="" alt="" className="bg_image" />
        <div className="main_logreg">
          <div id="tab_btn">
            <a href="/login" className="login_tab active">
              Login
            </a>
            <a href="/register" className="register_tab" id="register_tab_id">
              Register
            </a>
          </div>
          <br />
          <div id="login_box">
            <h1 id="login_header">Login</h1>
            <p>Username</p>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              name="username"
              placeholder="Username"
              required
            />
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              placeholder="Password"
              required
            />
            <button
              onClick={handleLoginUser}
              className="main_button"
              id="login_btn"
            >
              Login
            </button>
            <br /> <br />
            {/* <a href="/forget">Forgot password?</a>
            <br/> */}
            New user? Sign Up{" "}
            <a href="/register" id="here_btn">
              Here
            </a>
            {/* </p> */}
            <br />
          </div>
        </div>
      </div>
    );
}

export default Login;