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

// // 3
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const productRoutes = require("./routes/productRoutes");

// const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",
//   process.env.FRONTEND_URL, // production frontend URL, .env-এ বসাবেন deploy-এর সময়
// ].filter(Boolean);

// app.use(
//   cors({
//     origin: allowedOrigins,
//   }),
// );
// app.use(express.json());

// app.use("/api/products", productRoutes);

// app.get("/", (req, res) => res.send("TechHub API is running"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = app;

// 4

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const connectDB = require("./config/db"); //  ১. DB ফাংশনটি ইম্পোর্ট করা হলো (আপনার ফাইলের সঠিক পাথ দিন)
// const productRoutes = require("./routes/productRoutes");
// const aiRoutes = require("./routes/aiRoutes");
// const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",
//   process.env.FRONTEND_URL,
// ].filter(Boolean);

// app.use(
//   cors({
//     origin: allowedOrigins,
//   }),
// );
// app.use(express.json());

// // product Routes
// app.use("/api/products", productRoutes);

// app.use("/api/ai", aiRoutes);

// app.get("/", (req, res) => res.send("TechHub API is running"));

// // Global Error Catching (যাতে সার্ভার হুট করে বন্ধ না হয়)
// process.on("unhandledRejection", (err) => {
//   console.error("Unhandled Rejection Error:", err);
// });

// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception Error:", err);
// });

// const PORT = process.env.PORT || 5000;

// // 👈 ২. ডাটাবেসে কানেক্ট করে তারপর সার্ভার স্টার্ট করা
// connectDB()
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => {
//     console.error("MongoDB Connection Failed:", err);
//   });

// module.exports = app;

// 5

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const productRoutes = require("./routes/productRoutes");
// const aiRoutes = require("./routes/aiRoutes");

// const app = express();

// // FRONTEND_URL must have no trailing slash, e.g. https://your-frontend.vercel.app
// const allowedOrigins = [
//   "http://localhost:5173",
//   (process.env.FRONTEND_URL || "").replace(/\/$/, ""),
// ].filter(Boolean);

// app.use(cors({ origin: allowedOrigins }));
// app.use(express.json());

// app.use("/api/products", productRoutes);
// app.use("/api/ai", aiRoutes);

// app.get("/", (req, res) => res.send("TechHub API is running"));
// app.get("/favicon.ico", (req, res) => res.status(204).end());

// // Fallback error handler
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ message: err.message || "Server error" });
// });

// // Only listen when run locally (node server.js). Vercel imports the app instead.
// if (require.main === module) {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }

// module.exports = app;
// ssssssssssswww  no trailing s

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// FRONTEND_URL must have no trailing slash
const allowedOrigins = [
  "http://localhost:5173",
  (process.env.FRONTEND_URL || "").replace(/\/$/, ""),
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/", (req, res) => res.send("TechHub API is running"));
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Load routes safely: if one fails to load, the server still starts
// and /debug shows the real error (instead of a Vercel 500 page).
const loadErrors = [];
// NOTE: require() paths must be literal strings so Vercel bundles the files.
const mount = (path, name, loader) => {
  try {
    app.use(path, loader());
  } catch (err) {
    console.error(`Failed to load ${name}:`, err);
    loadErrors.push({ file: name, error: err.message });
  }
};
mount("/api/products", "productRoutes", () =>
  require("./routes/productRoutes"),
);
mount("/api/ai", "aiRoutes", () => require("./routes/aiRoutes"));

// TEMPORARY: remove this route after the problem is fixed
app.get("/debug", (req, res) => {
  res.json({
    node: process.version,
    loadErrors,
    env: {
      MONGO_URI: !!process.env.MONGO_URI,
      FRONTEND_URL: !!process.env.FRONTEND_URL,
      ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
      FIREBASE_SERVICE_ACCOUNT: !!process.env.FIREBASE_SERVICE_ACCOUNT,
      ADMIN_EMAILS: !!process.env.ADMIN_EMAILS,
    },
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;