import Movie from "../models/Movie.js";
import { handleError, notFound } from "../utils/responseHelpers.js";

export const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      director,
      releaseYear,
      rating,
      watched,
    } = req.body;

    const movie = await Movie.create({
      title,
      description,
      genre,
      director,
      releaseYear,
      rating,
      watched,
    });

    res.status(201).json({ success: true, data: movie });
  } catch (err) {
    handleError(err, res);
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: movies });
  } catch (err) {
    handleError(err, res);
  }
};

export const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return notFound(res);
    res.json({ success: true, data: movie });
  } catch (err) {
    handleError(err, res);
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return notFound(res);

    const fields = [
      "title",
      "description",
      "genre",
      "director",
      "releaseYear",
      "rating",
      "watched",
    ];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) movie[f] = req.body[f];
    });

    await movie.save();
    res.json({ success: true, data: movie });
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return notFound(res);
    res.json({success: true, message: "Movie deleted"})
  } catch (err) {
    handleError(err, res);
  }
};
