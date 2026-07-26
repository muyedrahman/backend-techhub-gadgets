const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

const connectDB = async () => {
  if (db) return db;
  await client.connect();
  db = client.db("techhub");
  console.log("MongoDB connected");
  return db;
};

module.exports = connectDB;
