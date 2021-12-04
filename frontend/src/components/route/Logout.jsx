import UserContext from '../../context/UserContext';
import {useContext} from 'react';
import UserService from '../../services/login.js';


const Logout = (props) => {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    // try {
        // create a post request so that it returns a response message then clean out the local storage and the
        // current user
        console.log(currentUser);
        // const res = await UserService.logout(currentUser);
        // if (res.status === 200 && res.data.message === 'success') {
        //     localStorage.removeItem('authtoken');
        //     setCurrentUser(
        //         {
        //             data: {
        //                 user_id: '',
        //                 username: '',
        //                 email: '',
        //                 first_name: '',
        //                 last_name: ''
        //             }
        //         }
        //     );
        //     props.history.push('/');
        // }
    // }
    // catch (error) {
    //     console.log(error);
    // }
    return (
        <div>
        </div>
    )
}

export default Logout;