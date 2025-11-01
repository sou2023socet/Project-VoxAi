import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Scheme", schemeSchema);
