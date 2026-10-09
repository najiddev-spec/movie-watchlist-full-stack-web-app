import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Movie from "./models/Movie.js";

dotenv.config();

const movies = [
  [
    "Interstellar",
    "Christopher Nolan",
    2014,
    8.7,
    "Sci-Fi",
    true,
    "Explorers travel through a wormhole to find humanity a new home.",
  ],
  [
    "Inception",
    "Christopher Nolan",
    2010,
    8.8,
    "Sci-Fi",
    true,
    "A thief steals secrets through dreams and is asked to plant an idea.",
  ],
  [
    "The Dark Knight",
    "Christopher Nolan",
    2008,
    9.0,
    "Action",
    true,
    "Batman faces the Joker, who pushes Gotham to its limit.",
  ],
  [
    "Parasite",
    "Bong Joon-ho",
    2019,
    8.5,
    "Thriller",
    true,
    "A poor family schemes its way into a wealthy household.",
  ],
  [
    "The Godfather",
    "Francis Ford Coppola",
    1972,
    9.2,
    "Crime",
    false,
    "An aging crime boss passes control to his reluctant son.",
  ],
  [
    "Spirited Away",
    "Hayao Miyazaki",
    2001,
    8.6,
    "Animation",
    true,
    "A girl enters a spirit world and works to free her parents.",
  ],
  [
    "Pulp Fiction",
    "Quentin Tarantino",
    1994,
    8.9,
    "Crime",
    false,
    "Interlocking stories of hitmen, a boxer and a gangster's wife.",
  ],
  [
    "The Shawshank Redemption",
    "Frank Darabont",
    1994,
    9.3,
    "Drama",
    true,
    "A wrongly convicted banker plans his escape from prison.",
  ],
  [
    "Mad Max: Fury Road",
    "George Miller",
    2015,
    8.1,
    "Action",
    false,
    "A drifter and a rebel flee a tyrant across the desert.",
  ],
  [
    "Get Out",
    "Jordan Peele",
    2017,
    7.7,
    "Horror",
    false,
    "A young man uncovers a disturbing secret at his girlfriend's home.",
  ],
  [
    "The Grand Budapest Hotel",
    "Wes Anderson",
    2014,
    8.1,
    "Comedy",
    true,
    "A concierge and his lobby boy get tangled in a theft.",
  ],
  [
    "Blade Runner 2049",
    "Denis Villeneuve",
    2017,
    8.0,
    "Sci-Fi",
    false,
    "A new blade runner uncovers a secret that could upend society.",
  ],
  [
    "Arrival",
    "Denis Villeneuve",
    2016,
    7.9,
    "Sci-Fi",
    true,
    "A linguist tries to communicate with newly arrived aliens.",
  ],
  [
    "Whiplash",
    "Damien Chazelle",
    2014,
    8.5,
    "Drama",
    true,
    "A young drummer is pushed to the edge by a ruthless teacher.",
  ],
  [
    "Coco",
    "Lee Unkrich",
    2017,
    8.4,
    "Animation",
    false,
    "A boy enters the Land of the Dead to uncover his family history.",
  ],
  [
    "Knives Out",
    "Rian Johnson",
    2019,
    7.9,
    "Mystery",
    true,
    "A detective investigates a novelist's death among his family.",
  ],
  [
    "La La Land",
    "Damien Chazelle",
    2016,
    8.0,
    "Romance",
    false,
    "A pianist and an actress chase their dreams in Los Angeles.",
  ],
  [
    "Gladiator",
    "Ridley Scott",
    2000,
    8.5,
    "Action",
    true,
    "A betrayed Roman general becomes a gladiator seeking revenge.",
  ],
  [
    "The Fellowship of the Ring",
    "Peter Jackson",
    2001,
    8.9,
    "Fantasy",
    true,
    "A hobbit and companions set out to destroy a powerful ring.",
  ],
  [
    "Saving Private Ryan",
    "Steven Spielberg",
    1998,
    8.6,
    "War",
    false,
    "Soldiers are sent behind enemy lines to bring one man home.",
  ],
  [
    "Django Unchained",
    "Quentin Tarantino",
    2012,
    8.5,
    "Western",
    false,
    "A freed slave and a bounty hunter set out to rescue his wife.",
  ],
  [
    "Spider-Man: Into the Spider-Verse",
    "Bob Persichetti",
    2018,
    8.4,
    "Animation",
    true,
    "Miles Morales becomes Spider-Man and meets heroes from other worlds.",
  ],
  [
    "Princess Mononoke",
    "Hayao Miyazaki",
    1997,
    8.3,
    "Fantasy",
    false,
    "A young warrior is caught between forest gods and an iron town.",
  ],
  [
    "Hereditary",
    "Ari Aster",
    2018,
    7.3,
    "Horror",
    false,
    "A grieving family unravels disturbing truths about its past.",
  ],
  [
    "Free Solo",
    "Jimmy Chin",
    2018,
    8.1,
    "Documentary",
    true,
    "Alex Honnold attempts to climb El Capitan without ropes.",
  ],
].map(
  ([title, director, releaseYear, rating, genre, watched, description]) => ({
    title,
    director,
    releaseYear,
    rating,
    genre,
    watched,
    description,
  }),
);

const seed = async () => {
  try {
    await connectDB();
    await Movie.init(); // builds indexes
    if (process.argv.includes("--clear")) {
      const { deletedCount } = await Movie.deleteMany({});
      console.log(`Deleted ${deletedCount} movies`);
      return;
    }
    if (process.argv.includes("--reset")) {
      await Movie.deleteMany({});
      console.log("Existing movies removed");
    } else if ((await Movie.estimatedDocumentCount()) > 0) {
      console.log("Collection has data. Use --reset to wipe and reseed.");
      return;
    }
    const inserted = await Movie.insertMany(movies);
    console.log(`Inserted ${inserted.length} movies`);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seed();
