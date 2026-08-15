// const express = require("express");
// const router = express.Router();
// const { ObjectId } = require("mongodb");
// const connectDB = require("../config/db");
// const verifyAdmin = require("../middleware/verifyAdmin");
// const { BRANDS, TYPES } = require("../constants/productConstants");

// // GET /api/products?brand=&type=&search=&page=
// router.get("/", async (req, res) => {
//   try {
//     const db = await connectDB();
//     const { brand, type, search, page = 1 } = req.query;
//     const limit = 20;
//     const query = {};

//     if (brand) query.brand = brand;
//     if (type) query.type = type;
//     if (search) query.name = { $regex: search, $options: "i" };

//     const total = await db.collection("products").countDocuments(query);
//     const products = await db
//       .collection("products")
//       .find(query)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .toArray();

//     res.json({
//       products,
//       totalPages: Math.ceil(total / limit),
//       currentPage: Number(page),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET /api/products/brands-with-types
// router.get("/brands-with-types", async (req, res) => {
//   try {
//     const db = await connectDB();
//     const result = await db
//       .collection("products")
//       .aggregate([{ $group: { _id: "$brand", types: { $addToSet: "$type" } } }])
//       .toArray();
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET /api/products/:id
// router.get("/:id", async (req, res) => {
//   try {
//     const db = await connectDB();
//     if (!ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Invalid product id" });
//     }
//     const product = await db
//       .collection("products")
//       .findOne({ _id: new ObjectId(req.params.id) });
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // POST /api/products (admin only)
// router.post("/", verifyAdmin, async (req, res) => {
//   try {
//     const {
//       name,
//       brand,
//       type,
//       price,
//       images,
//       specs,
//       shortDescription,
//       fullDescription,
//       releaseYear,
//     } = req.body;

//     if (!name || !brand || !type || !price) {
//       return res
//         .status(400)
//         .json({ message: "name, brand, type, price আবশ্যক" });
//     }
//     if (!BRANDS.includes(brand)) {
//       return res.status(400).json({ message: "অবৈধ brand" });
//     }
//     if (!TYPES.includes(type)) {
//       return res.status(400).json({ message: "অবৈধ type" });
//     }

//     const db = await connectDB();
//     const newProduct = {
//       name,
//       brand,
//       type,
//       price,
//       images: images || [],
//       specs: specs || {},
//       shortDescription: shortDescription || "",
//       fullDescription: fullDescription || "",
//       releaseYear: releaseYear || null,
//       createdAt: new Date(),
//     };

//     const result = await db.collection("products").insertOne(newProduct);
//     res.status(201).json({ _id: result.insertedId, ...newProduct });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // PUT /api/products/:id (admin only)
// router.put("/:id", verifyAdmin, async (req, res) => {
//   try {
//     const db = await connectDB();
//     if (!ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Invalid product id" });
//     }

//     if (req.body.brand && !BRANDS.includes(req.body.brand)) {
//       return res.status(400).json({ message: "অবৈধ brand" });
//     }
//     if (req.body.type && !TYPES.includes(req.body.type)) {
//       return res.status(400).json({ message: "অবৈধ type" });
//     }

//     const result = await db
//       .collection("products")
//       .findOneAndUpdate(
//         { _id: new ObjectId(req.params.id) },
//         { $set: req.body },
//         { returnDocument: "after" },
//       );

//     if (!result) return res.status(404).json({ message: "Product not found" });
//     res.json(result);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // DELETE /api/products/:id (admin only)
// router.delete("/:id", verifyAdmin, async (req, res) => {
//   try {
//     const db = await connectDB();
//     if (!ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Invalid product id" });
//     }
//     const result = await db
//       .collection("products")
//       .deleteOne({ _id: new ObjectId(req.params.id) });
//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

// 2
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");
const verifyAdmin = require("../middleware/verifyAdmin");
const { BRANDS, TYPES } = require("../constants/productConstants");

router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const { brand, type, search, page = 1 } = req.query;
    const limit = 20;
    const query = {};

    if (brand) query.brand = brand;
    if (type) query.type = type;
    if (search) query.name = { $regex: search, $options: "i" };

    const total = await db.collection("products").countDocuments(query);
    const products = await db
      .collection("products")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    res.json({
      products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/brands-with-types", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db
      .collection("products")
      .aggregate([{ $group: { _id: "$brand", types: { $addToSet: "$type" } } }])
      .toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const db = await connectDB();
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", verifyAdmin, async (req, res) => {
  try {
    const {
      name,
      brand,
      type,
      price,
      images,
      specs,
      shortDescription,
      fullDescription,
      releaseYear,
    } = req.body;

    if (!name || !brand || !type || !price) {
      return res
        .status(400)
        .json({ message: "name, brand, type, and price are required" });
    }
    if (!BRANDS.includes(brand)) {
      return res.status(400).json({ message: "Invalid brand" });
    }
    if (!TYPES.includes(type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    const db = await connectDB();
    const newProduct = {
      name,
      brand,
      type,
      price,
      images: images || [],
      specs: specs || {},
      shortDescription: shortDescription || "",
      fullDescription: fullDescription || "",
      releaseYear: releaseYear || null,
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(newProduct);
    res.status(201).json({ _id: result.insertedId, ...newProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const db = await connectDB();
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    if (req.body.brand && !BRANDS.includes(req.body.brand)) {
      return res.status(400).json({ message: "Invalid brand" });
    }
    if (req.body.type && !TYPES.includes(req.body.type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    const result = await db
      .collection("products")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
        { returnDocument: "after" },
      );

    if (!result) return res.status(404).json({ message: "Product not found" });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const db = await connectDB();
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }
    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;