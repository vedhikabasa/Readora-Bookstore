const mongoose = require("mongoose");
const express = require("express");
const Order = require("../orders/order.model");
const Book = require("../books/book.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Total Sales
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    // Trending Books Count
    const trendingBooksCount = await Book.aggregate([
      {
        $match: { trending: true },
      },
      {
        $count: "trendingBooksCount",
      },
    ]);

    const trendingBooks =
      trendingBooksCount.length > 0
        ? trendingBooksCount[0].trendingBooksCount
        : 0;

    // Total Books
    const totalBooks = await Book.countDocuments();

    // Monthly Revenue
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createdAt",
            },
          },
          totalSales: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    
    const categoryData = await Book.aggregate([
  {
    $group: {
      _id: "$category",
      count: { $sum: 1 },
    },
  },
]);

    // Latest 5 Orders
    const latestOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email totalPrice createdAt");

      // Top Selling Books
      const topSellingBooks = await Order.aggregate([
  { $unwind: "$productIds" },

  {
    $group: {
      _id: "$productIds",
      totalSold: { $sum: 1 },
    },
  },

  {
    $sort: {
      totalSold: -1,
    },
  },

  {
    $limit: 5,
  },

  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "_id",
      as: "book",
    },
  },

  {
    $unwind: "$book",
  },

  {
    $project: {
      _id: 0,
      title: "$book.title",
      image: "$book.coverImage",
      totalSold: 1,
    },
  },
]);

console.log(topSellingBooks);

    res.status(200).json({
  totalOrders,
  totalSales: totalSales[0]?.totalSales || 0,
  trendingBooks,
  totalBooks,
  monthlySales,
  latestOrders,
  categoryData,
  topSellingBooks,
});
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({
      message: "Failed to fetch admin stats",
    });
  }
});

module.exports = router;