import { connect, connection } from "mongoose";


// connects to db if not connected and returns true or error.
//
async function ConnectToDB(): Promise<Error | Boolean> {
    const ConnectionUri = process.env.MONOGO_CONNECTION_URI;
    if (!ConnectionUri) throw new Error("Invalid Connection String");

    try {
        if (connection) return true;

        await connect(ConnectionUri);
        console.log("Db connected");
        return true;
    }
    catch (e) {
        throw new Error("Error while connecting to the db");
    }
}

export default ConnectToDB;
