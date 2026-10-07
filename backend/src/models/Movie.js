import mongoose from "mongoose";

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western",
  "Other",
];

const currentYear = new Date().getFullYear();

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [150, "Title must be 150 characters of fewer"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description must be 2000 characters or fewer"],
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
      maxlength: [100, "Director must be 100 characters or fewer"],
    },
    releaseYear: {
      type: Number,
      required: [true, "Release year is required"],
      min: [1888, "Release year must be 1888 or later"],
      max: [currentYear + 5, `Release year cannot be after ${currentYear + 5}`],
      validate: {
        validator: Number.isInteger,
        message: "Release year must be a whole number",
      },
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating must be between 0 and 10"],
      max: [10, "Rating must be between 0 and 10"],
    },
    watched: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export { GENRES };
export default mongoose.model("Movie", movieSchema);
