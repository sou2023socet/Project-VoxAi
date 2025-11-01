import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Scheme from "../models/Scheme.js";

dotenv.config(); // <— must be at the very top

const seedData = async () => {
  try {
    await connectDB();
    await Scheme.deleteMany();

    await Scheme.insertMany([
      {
        title: "PM Scholarship Scheme",
        description: "Financial assistance for meritorious students.",
        category: "Education",
      },
      {
        title: "Startup India",
        description: "Support and funding for new startups.",
        category: "Entrepreneurship",
      },
    ]);

    console.log("✅ Sample data seeded successfully");
    process.exit();
  } catch (err) {
    console.error(`❌ Error seeding data: ${err.message}`);
    process.exit(1);
  }
};

seedData();
