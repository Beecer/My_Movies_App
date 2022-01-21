const express = require("express"),
  morgan = require("morgan");

const app = express();

let topMovies = [
  {
    title: "Top Gun",
    director: "Tony Scott"
  },
  {
    title: "The Sandlot",
    director: "David Mickey Adams"
  },
  {
    title: "Rocky IV",
    director: "Sylevester Stallone"
  },
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont"
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis"
  },
  {
    title: "300",
    director: "Zack Snyder"
  },
  {
    title: "Wedding Crashers",
    director: "David Dobkin"
  },
  {
    title: "Friday",
    director: "F. Gary Gray"
  },
  {
    title: "Stepbrothers",
    director: "Adam McKay"
  },
  {
    title: "Legends of the Fall",
    director: "Edward Zwick"
  }
];

// GET requests
app.get("/movies", (req, res) => {
  res.send(topMovies);
});
app.get("/", (req, res) => {
  res.send("These are my favorite movies!");
});
app.use(express.static("public"));

app.use(morgan("common"));

app.get("/secreturl", (req, res) => {
  res.send("Shhhh, this is a secret!");
});

app.use((err, req, res, next) => {
  console.err(err.stack);
  res.status(500).send("Oops, something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
