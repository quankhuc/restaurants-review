import UsersDAO from '../dao/usersDAO.js';

//Users Controller
export default class UserControl{
    static async apiRegisterPostUser(req, res){
        try {
            const user_info = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name
            };
            // make a get request first to check if the username is already taken
            const test_user = await UsersDAO.getUserByUsername(user_info.username);
            if (test_user) {
                res.status(400).json({
                    message: "Username already taken"
                });

            } else {
                const result = await UsersDAO.createUser(user_info);
                console.log(result);
                res.status(200).json({
                    status: 'success',
                    data: result,
                });
            }
        }
        catch (err){
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    // login for a specific user
    static async apiLoginPostUser(req, res){
        try {
            const user_info = {
                username: req.body.username,
                password: req.body.password
            };
            let result = await UsersDAO.getUserByUsername(user_info.username);
            if (result) {
                console.log({result});
                if (result.password === user_info.password) {
                    // need to generate token
                    res.status(200).json({
                        message: 'success',
                        user_id: result._id,
                        username: result.username,
                        email: result.email,
                        first_name: result.first_name,
                        last_name: result.last_name,
                    });
                } else {
                    res.status(400).json({
                        message: "Incorrect password"
                    });
                }
            } else {
                res.status(400).json({
                    message: "Username not found"
                });
            }
        }
        catch (err){
            res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    // create a post request for logging out
    static async apiLogoutPostUser(req, res){
        try {
            const user_info = {
                user_id: req.body.username
            };
            let result = await UsersDAO.getUserByUsername(user_info.username);
            if (result) {
                res.status(200).json({
                    status: 'success',
                    user_id: '',
                    username: '',
                    email: '',
                    first_name: '',
                    last_name: '',
                });
            } else {
                res.status(400).json({
                    message: "User not found"
                });
            }
        }
        catch (err){
            res.status(500).json({
                status: 'Server error',
                message: err.message
            });
        }
    }
}