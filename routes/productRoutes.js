const total = await db.collection("products").countDocuments(query);
const products = await db
  .collection("products")
  .find(query)
  .sort({ createdAt: -1 })
  .skip((page - 1) * limit)
  .limit(limit)
  .toArray();

  

module.exports = router;
