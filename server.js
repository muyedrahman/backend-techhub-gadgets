// // const express = require("express");
// // const cors = require("cors");
// // require("dotenv").config();

// // const productRoutes = require("./routes/productRoutes");

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // app.use("/api/products", productRoutes);

// // app.get("/", (req, res) => res.send("TechHub API is running"));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // module.exports = app;

// const express = require("express");
// require("dotenv").config();
// const connectDB = require("./config/db");

// const app = express();

// connectDB()
//   .then(() => {
//     app.listen(5000, () => console.log("Server running on port 5000"));
//   })
//   .catch((err) => {
//     console.error("Connection failed:", err.message);
//   });

// app.get("/", (req, res) => res.send("TechHub API is running"));

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const productRoutes = require("./routes/productRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/products", productRoutes);

// app.get("/", (req, res) => res.send("TechHub API is running"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = app;

// 3
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // production frontend URL, .env-এ বসাবেন deploy-এর সময়
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => res.send("TechHub API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;