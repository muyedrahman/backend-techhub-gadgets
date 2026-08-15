import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
// config ফোল্ডার থেকে ১ ধাপ উপরে রুট ফোল্ডারে থাকা serviceAccountKey.json ফাইল ধরা হচ্ছে
// const serviceAccount = require("../serviceAccountKey.json");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const adminAuth = admin.auth();
