import UserService from "../../services/login";
import {useRef} from "react";

function Register(props){
   const username_ref = useRef();
   const password_ref = useRef();
   const email_ref = useRef();
   const first_name_ref = useRef();
   const last_name_ref = useRef();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const username = username_ref.current.value;
        const password = password_ref.current.value;
        const email = email_ref.current.value;
        const first_name = first_name_ref.current.value;
        const last_name = last_name_ref.current.value;
        const data = {
            username: username,
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name
        }
        UserService.register(data)
            .then(res => {
                let temp = res.data;
                console.log(temp);
                props.history.push("/login");
        })

    }

    return(
        <div className="register-box">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" ref={first_name_ref} placeholder="First Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" ref={last_name_ref} placeholder="Last Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" ref={email_ref} placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" ref={username_ref} placeholder="Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" ref={password_ref} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register;