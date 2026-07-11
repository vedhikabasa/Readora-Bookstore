const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    address: {
        street: {
            type: String,
            required: true,
        },  
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      zipcode: {
        type: String,
        default: "",
      },
    },

    phone: {
      type: String,   // Better than Number
      required: true,
    },

    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);