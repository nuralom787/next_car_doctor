import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI;

export const collectionsNames = {
    servicesCollection: "services",
    usersCollections: "users"
}

const dbConnect = (collectionName) => {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.db(process.env.MONGODB_COLLECTION).collection(collectionName);
};

export default dbConnect;