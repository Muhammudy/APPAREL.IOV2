const mongoose = require('mongoose');


const inventorySchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    condition: { type: String, enum: ["New", "Used"], required: true },
    quantity: { type: Number, required: true, min: 1 },
    category: {
      type: String,
      enum: ["Trading Cards", "Sneakers", "Accessories", "Apparel", "Electronics", "Collectibles"],
      required: true,
    },
    access : {
        type : String,
        enum : ["Public", "Private"],
        default : "Public",

    },
    subcategory: { type: String }, // optional
    priceListed: { type: Number, min: 0 },
    priceSold: { type: Number, min: 0 },
    isSold: { type: Boolean, default: false },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  },
  { timestamps: true }
);


inventorySchema.virtual("profit").get(function () {
  if (this.isSold && this.priceSold != null && this.priceListed != null) {
    return this.priceSold - this.priceListed;
  }
  return null;
});



const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;