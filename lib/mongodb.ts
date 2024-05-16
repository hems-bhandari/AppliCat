import { MongoClient, MongoClientOptions } from "mongodb";

const ConnectionUri = process.env.MONOGO_CONNECTION_URI;

const options: MongoClientOptions = {}
//

let client, clientPromise;

if (!ConnectionUri) throw new Error("Connection variable not found");

client = new MongoClient(ConnectionUri, options);
clientPromise = client.connect();

export default clientPromise;
