// const admin = require("firebase-admin");

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(
//       JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
//     ),
//   });
// }

// const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "").split(",");

// const verifyAdmin = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Token missing" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     if (!ADMIN_EMAILS.includes(decoded.email)) {
//       return res.status(403).json({ message: "Not authorized as admin" });
//     }
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = verifyAdmin;

// 2

// const admin = require("firebase-admin");

// let firebaseInitialized = false;

// const initFirebase = () => {
//   if (firebaseInitialized) return;
//   if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
//     throw new Error("FIREBASE_SERVICE_ACCOUNT not set in .env");
//   }
//   admin.initializeApp({
//     credential: admin.credential.cert(
//       JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
//     ),
//   });
//   firebaseInitialized = true;
// };

// const verifyAdmin = async (req, res, next) => {
//   try {
//     initFirebase(); // শুধু এই route hit হলে Firebase চালু হবে
//   } catch (err) {
//     return res.status(500).json({ message: "Server auth not configured yet" });
//   }

//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Token missing" });
//   }

//   const token = authHeader.split(" ")[1];
//   const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "").split(",");

//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     if (!ADMIN_EMAILS.includes(decoded.email)) {
//       return res.status(403).json({ message: "Not authorized as admin" });
//     }
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = verifyAdmin;

// 3

// const admin = require("firebase-admin");
// const path = require("path");

// let firebaseInitialized = false;

// const initFirebase = () => {
//   if (firebaseInitialized) return;

//   // Root ফোল্ডারে থাকা serviceAccountKey.json ফাইল ইমপোর্ট করা হচ্ছে
//   const serviceAccount = require(
//     path.join(__dirname, "../serviceAccountKey.json"),
//   );

//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });

//   firebaseInitialized = true;
// };

// const verifyAdmin = async (req, res, next) => {
//   try {
//     initFirebase();
//   } catch (err) {
//     console.error("Firebase Init Error:", err.message);
//     return res.status(500).json({
//       message: "Server auth not configured yet",
//       error: err.message,
//     });
//   }

//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Token missing" });
//   }

//   const token = authHeader.split(" ")[1];
//   const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "").split(",");

//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     if (!ADMIN_EMAILS.includes(decoded.email)) {
//       return res.status(403).json({ message: "Not authorized as admin" });
//     }
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = verifyAdmin;

// 4
const admin = require("firebase-admin");
const path = require("path");

let firebaseInitialized = false;

const initFirebase = () => {
  if (firebaseInitialized) return;

  // Root ফোল্ডারে থাকা serviceAccountKey.json ফাইল ইমপোর্ট করা হচ্ছে
  const serviceAccount = require(
    path.join(__dirname, "../serviceAccountKey.json"),
  );

  // credential.cert অবজেক্টটি ঠিকমতো অ্যাক্সেস নিশ্চিত করা
  const credential = admin.credential
    ? admin.credential
    : admin.default.credential;

  admin.initializeApp({
    credential: credential.cert(serviceAccount),
  });

  firebaseInitialized = true;
};

const verifyAdmin = async (req, res, next) => {
  try {
    initFirebase();
  } catch (err) {
    console.error("Firebase Init Error:", err.message);
    return res.status(500).json({
      message: "Server auth not configured yet",
      error: err.message,
    });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];
  const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "").split(",");

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (!ADMIN_EMAILS.includes(decoded.email)) {
      return res.status(403).json({ message: "Not authorized as admin" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyAdmin;