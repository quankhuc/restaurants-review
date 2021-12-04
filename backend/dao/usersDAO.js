import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;

let users;

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) return;
        try{
            users = await conn.db(process.env.RESTREVIEWS_NS).collection('users');
        }
        catch(err){
            console.error(`Unable to get the users collection: `,err);
        }
    }

    static async createUser(data){
        try{
            console.log(data)
            return await users.insertOne(data);
        }
        catch(err){
            console.error(`Unable to add user: `,err);
            return {error: err};
        }
    }

    static async getUser(data){
        try{
            const user_info = {
                username: data.username,
                password: data.password
            }
            return await users.findOne(user_info);
        }
        catch(err){
            console.error(`Unable to get user: `,err);
            return {error: err};
        }
    }

    //enforce the username has to be unique
    static async getUserByUsername(username){
        try{
            return await users.findOne({username: username});
        }
        catch(err){
            console.error(`Unable to get user: `,err);
            return {error: err};
        }
    }
}