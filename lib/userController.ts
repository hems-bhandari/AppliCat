import { User } from "./models/user";

// returs user If present else returns false
// TODO:ADD PROPER TYPE DEFINITION FOR USER
export const getIfUserExistance = async (email: string): Promise<boolean | any> => {
    try {
        const userInDB = await User.findOne({ 'email': email });
        if (!userInDB) return false;
        return userInDB;
    }
    catch (e) {
        console.log(e);
        throw new Error(`Error while checking user existance ${e}`)
    }
}
