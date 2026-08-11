// require("dotenv").config();
// const connectDB = require("./config/db");

// const sampleProducts = [
//   {
//     name: "iPhone 15 Pro",
//     brand: "Apple",
//     type: "mobile",
//     price: 145000,
//     images: ["https://i.ibb.co.com/jZwD6v1Y/banner-01.jpg"],
//     specs: { ram: "8GB", storage: "256GB", display: "6.1 inch OLED" },
//     shortDescription: "Apple-এর সর্বশেষ প্রিমিয়াম মডেল",
//     fullDescription: "বিস্তারিত বর্ণনা এখানে লিখবেন",
//     releaseYear: 2023,
//     createdAt: new Date(),
//   },
//   {
//     name: "Galaxy S24 Ultra",
//     brand: "Samsung",
//     type: "mobile",
//     price: 132000,
//     images: ["https://i.ibb.co.com/6JVvcf82/banner-03.jpg"],
//     specs: { ram: "12GB", storage: "512GB", display: "6.8 inch AMOLED" },
//     shortDescription: "Samsung-এর ফ্ল্যাগশিপ মডেল",
//     fullDescription: "বিস্তারিত বর্ণনা এখানে লিখবেন",
//     releaseYear: 2024,
//     createdAt: new Date(),
//   },
//   {
//     name: "MacBook Pro M3",
//     brand: "Apple",
//     type: "laptop",
//     price: 210000,
//     images: ["https://i.ibb.co.com/35CGc10V/banner-04.jpg"],
//     specs: {
//       ram: "16GB",
//       storage: "512GB SSD",
//       display: "14.2 inch Liquid Retina XDR",
//     },
//     shortDescription: "প্রফেশনাল কাজের জন্য শক্তিশালী অ্যাপল ল্যাপটপ",
//     fullDescription: "বিস্তারিত বর্ণনা এখানে লিখবেন",
//     releaseYear: 2023,
//     createdAt: new Date(),
//   },
//   {
//     name: "Apple Watch Ultra 2",
//     brand: "Apple",
//     type: "watch",
//     price: 89000,
//     images: ["https://i.ibb.co.com/jZwD6v1Y/banner-01.jpg"],
//     specs: {
//       battery: "36 Hours",
//       display: "49mm Always-On Retina",
//       connectivity: "GPS + Cellular",
//     },
//     shortDescription: "টাফ, প্রিসিশন-ইঞ্জিনিয়ার্ড স্মার্টওয়াচ",
//     fullDescription: "বিস্তারিত বর্ণনা এখানে লিখবেন",
//     releaseYear: 2023,
//     createdAt: new Date(),
//   },
//   {
//     name: "iPad Pro 11",
//     brand: "Apple",
//     type: "tablet",
//     price: 115000,
//     images: ["https://i.ibb.co.com/6JVvcf82/banner-03.jpg"],
//     specs: {
//       ram: "8GB",
//       storage: "128GB",
//       display: "11 inch Ultra Retina XDR",
//     },
//     shortDescription: "সৃজনশীল কাজ এবং পোর্টেবিলিটির জন্য সেরা ট্যাব",
//     fullDescription: "বিস্তারিত বর্ণনা এখানে লিখবেন",
//     releaseYear: 2024,
//     createdAt: new Date(),
//   },
// ];

// const seed = async () => {
//   const db = await connectDB();
//   await db.collection("products").insertMany(sampleProducts);
//   console.log(`${sampleProducts.length}টা প্রোডাক্ট যোগ হয়েছে`);
//   process.exit(0);
// };

// seed().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });

// 2
require("dotenv").config();
const connectDB = require("./config/db");

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    brand: "Apple",
    type: "mobile",
    price: 145000,
    images: ["https://i.ibb.co.com/jZwD6v1Y/banner-01.jpg"],
    specs: { ram: "8GB", storage: "256GB", display: "6.1 inch OLED" },
    shortDescription: "Apple's latest premium flagship model",
    fullDescription: "Detailed description will be added here",
    releaseYear: 2023,
    createdAt: new Date(),
  },
  {
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    type: "mobile",
    price: 132000,
    images: ["https://i.ibb.co.com/6JVvcf82/banner-03.jpg"],
    specs: { ram: "12GB", storage: "512GB", display: "6.8 inch AMOLED" },
    shortDescription: "Samsung's flagship mobile device",
    fullDescription: "Detailed description will be added here",
    releaseYear: 2024,
    createdAt: new Date(),
  },
  {
    name: "MacBook Pro M3",
    brand: "Apple",
    type: "laptop",
    price: 210000,
    images: ["https://i.ibb.co.com/35CGc10V/banner-04.jpg"],
    specs: {
      ram: "16GB",
      storage: "512GB SSD",
      display: "14.2 inch Liquid Retina XDR",
    },
    shortDescription: "Powerful Apple laptop built for professional work",
    fullDescription: "Detailed description will be added here",
    releaseYear: 2023,
    createdAt: new Date(),
  },
  {
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    type: "watch",
    price: 89000,
    images: ["https://i.ibb.co.com/jZwD6v1Y/banner-01.jpg"],
    specs: {
      battery: "36 Hours",
      display: "49mm Always-On Retina",
      connectivity: "GPS + Cellular",
    },
    shortDescription: "Tough, precision-engineered smartwatch",
    fullDescription: "Detailed description will be added here",
    releaseYear: 2023,
    createdAt: new Date(),
  },
  {
    name: "iPad Pro 11",
    brand: "Apple",
    type: "tablet",
    price: 115000,
    images: ["https://i.ibb.co.com/6JVvcf82/banner-03.jpg"],
    specs: {
      ram: "8GB",
      storage: "128GB",
      display: "11 inch Ultra Retina XDR",
    },
    shortDescription: "The best tablet for creative work and portability",
    fullDescription: "Detailed description will be added here",
    releaseYear: 2024,
    createdAt: new Date(),
  },
];

const seed = async () => {
  const db = await connectDB();
  await db.collection("products").insertMany(sampleProducts);
  console.log(`${sampleProducts.length} products inserted successfully`);
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});