// const { MongoClient, ServerApiVersion } = require("mongodb");

// const client = new MongoClient(process.env.MONGO_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// let db;

// const connectDB = async () => {
//   if (db) return db;
//   await client.connect();
//   await client.db("admin").command({ ping: 1 }); // এই লাইনটা নতুন যোগ হলো
//   console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   db = client.db("techhub");
//   return db;
// };

// module.exports = connectDB;

// 1
const { MongoClient, ServerApiVersion } = require("mongodb");

// Cache across warm serverless invocations
let client;
let db;

const connectDB = async () => {
  if (db) return db;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set");
  }

  client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  db = client.db("techhub");
  return db;
};

module.exports = connectDB;