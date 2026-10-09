import mongoose from "mongoose";
import { GENRES, MOVIE_LIMITS as L, getMaxYear } from "../constants.js";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [
        L.TITLE_MAX,
        `Title must be ${L.TITLE_MAX} characters or fewer`,
      ],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [
        L.DESCRIPTION_MAX,
        `Description must be ${L.DESCRIPTION_MAX} characters or fewer`,
      ],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: { values: GENRES, message: "{VALUE} is not a valid genre" },
    },
    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
      maxlength: [
        L.DIRECTOR_MAX,
        `Director must be ${L.DIRECTOR_MAX} characters or fewer`,
      ],
    },
    releaseYear: {
      type: Number,
      required: [true, "Release year is required"],
      min: [L.MIN_YEAR, `Release year must be ${L.MIN_YEAR} or later`],
      validate: [
        {
          validator: Number.isInteger,
          message: "Release year must be a whole number",
        },
        {
          validator: (v) => v <= getMaxYear(),
          message: () => `Release year cannot be after ${getMaxYear()}`
        },
      ],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [
        L.MIN_RATING,
        `Rating must be between ${L.MIN_RATING} and ${L.MAX_RATING}`,
      ],
      max: [
        L.MAX_RATING,
        `Rating must be between ${L.MIN_RATING} and ${L.MAX_RATING}`,
      ],
    },
    watched: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

movieSchema.index({ genre: 1, watched: 1, createdAt: -1, _id: -1 });
movieSchema.index({ createdAt: -1, _id: -1 });
movieSchema.index({ rating: -1, _id: -1 });
movieSchema.index({ releaseYear: -1, _id: -1 });

export default mongoose.model("Movie", movieSchema);
