import { MAX_SEARCH_LENGTH, PAGINATION, SORT_OPTIONS } from "../constants.js";
import Movie from "../models/Movie.js";
import { escapeRegex, toPositiveInt } from "../utils/queryHelpers.js";
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
    } = req.body ?? {};

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
    const { search, genre, watched, sort = "newest" } = req.query;

    if (!Object.hasOwn(SORT_OPTIONS, sort)) {
      return res.status(400).json({
        success: false,
        message: `Invalid sort. Use one of: ${Object.keys(SORT_OPTIONS).join(", ")}`,
      });
    }

    if (watched && !["true", "false"].includes(watched)) {
      return res.status(400).json({
        success: false,
        message: 'watched must be "true" or "false"',
      });
    }

    const page = toPositiveInt(req.query.page, PAGINATION.DEFAULT_PAGE);
    const limit = Math.min(
      toPositiveInt(req.query.limit, PAGINATION.DEFAULT_LIMIT),
      PAGINATION.MAX_LIMIT,
    );

    const filter = {};

    if (typeof search === "string" && search.trim()) {
      filter.title = {
        $regex: escapeRegex(search.trim().slice(0, MAX_SEARCH_LENGTH)),
        $options: "i",
      };
    }

    if (typeof genre === "string" && genre.trim()) {
      filter.genre = genre.trim();
    }

    if (watched === "true" || watched === "false") {
      filter.watched = watched === "true";
    }

    const [movies, total] = await Promise.all([
      Movie.find(filter)
        .sort(SORT_OPTIONS[sort])
        .skip((page - 1) * limit)
        .limit(limit),
      Movie.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: movies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
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
    const body = req.body ?? {};
    fields.forEach((f) => {
      if (body[f] !== undefined) movie[f] = body[f];
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
    res.json({ success: true, message: "Movie deleted" });
  } catch (err) {
    handleError(err, res);
  }
};
