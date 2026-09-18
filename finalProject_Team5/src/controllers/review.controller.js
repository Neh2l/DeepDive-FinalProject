const Review = require("../models/review.model");

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (rating === undefined || rating === null) {
      return res.status(400).json({
        message: "Rating is required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    if (!comment || comment.trim().length < 2) {
      return res.status(400).json({
        message: "Comment must be at least 2 characters",
      });
    }

    if (comment.trim().length > 500) {
      return res.status(400).json({
        message: "Comment cannot exceed 500 characters",
      });
    }

    const review = await Review.create({
      user: req.user._id,
      rating,
      comment: comment.trim(),
      status: "pending",
    });

    res.status(201).json({
      message: "Review submitted successfully and is waiting for admin approval",
      review: {
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        status: review.status,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      status: "approved",
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      status: "pending",
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const approveReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    review.status = "approved";

    await review.save();

    res.status(200).json({
      message: "Review approved successfully",
      review: {
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        status: review.status,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const rejectReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    review.status = "rejected";

    await review.save();

    res.status(200).json({
      message: "Review rejected successfully",
      review: {
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        status: review.status,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createReview,
  getApprovedReviews,
  getPendingReviews,
  approveReview,
  rejectReview,
};