export const GENRES = [
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

export const SORT_OPTIONS = {
  newest: { createdAt: -1, _id: -1 },
  oldest: { createdAt: 1, _id: 1 },
  rating_desc: { rating: -1, _id: -1 },
  rating_asc: { rating: 1, _id: 1 },
  year_desc: { releaseYear: -1, _id: -1 },
  year_asc: { releaseYear: 1, _id: 1 },
};

export const PAGINATION = { DEFAULT_PAGE: 1, DEFAULT_LIMIT: 9, MAX_LIMIT: 50 };

export const MOVIE_LIMITS = {
  TITLE_MAX: 150,
  DESCRIPTION_MAX: 2000,
  DIRECTOR_MAX: 100,
  MIN_YEAR: 1888,
  FUTURE_YEARS: 5, // how many years ahead a release can be
  MIN_RATING: 0,
  MAX_RATING: 10,
};
export const getMaxYear = () => new Date().getFullYear() + MOVIE_LIMITS.FUTURE_YEARS;

export const MAX_SEARCH_LENGTH = 100;