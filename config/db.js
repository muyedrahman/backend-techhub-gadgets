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
  await client.db("admin").command({ ping: 1 }); // এই লাইনটা নতুন যোগ হলো
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  db = client.db("techhub");
  return db;
};

module.exports = connectDB;
