import { MongoClient } from "mongodb";

const uri =
  "mongodb://mongo1:27017,mongo2:27017,mongo3:27017/mydb?replicaSet=dbrs";

const client = new MongoClient(uri, {
  replicaSet: "dbrs",
});
export const mongoClient = async () => {
  try {
    await client.connect();
    console.log("Mongo connected");

    return client;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

export const closeMongoClient = async () => {
  if (client) {
    await client.close();
    console.log("Mongo client closed");
  }
};
