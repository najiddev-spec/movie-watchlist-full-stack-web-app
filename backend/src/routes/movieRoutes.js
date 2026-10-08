import express from "express";
import {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.route("/").get(getMovies).post(createMovie);

router
  .route("/:id")
  .all(validateObjectId)
  .get(getMovie)
  .put(updateMovie)
  .patch(updateMovie)
  .delete(deleteMovie);
export default router;
