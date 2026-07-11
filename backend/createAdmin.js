require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/users/user.model");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.DB_URL);

    // Admin already exists aa check cheyyi
    const existingAdmin = await User.findOne({ username: "admin" });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const admin = new User({
      username: "admin",
      password: "admin123",
      role: "admin",
    });

    await admin.save();

    console.log("🎉 Admin created successfully!");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createAdmin();