const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "BC",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "Kristin",
    favoriteMovies: ["Wedding Crashers"]
  }
];

let movies = [
  {
    Title: "Top Gun",
    Director: {
      Name: "Tony Scott",
      About: "NA"
    },
    Genre: {
      Name: "Action"
    }
  },
  {
    Title: "The Sandlot",
    Director: {
      Name: "David Mickey Adams",
      About: "NA"
    },
    Genre: {
      Name: "Comedy"
    }
  },
  {
    Title: "Rocky IV",
    Director: {
      Name: "Sylevester Stallone",
      About: "NA"
    },
    Genre: {
      Name: "Action"
    }
  },
  {
    Title: "The Shawshank Redemption",
    Director: {
      Name: "Frank Darabont",
      About: "NA"
    },
    Genre: {
      Name: "Drama"
    }
  },
  {
    Title: "Forrest Gump",
    Director: {
      Name: "Robert Zemeckis",
      About: "NA"
    },
    Genre: {
      Name: "Drama"
    }
  },
  {
    Title: "300",
    Director: {
      Name: "Zack Snyder",
      About: "NA"
    },
    Genre: {
      Name: "Action"
    }
  },
  {
    Title: "Wedding Crashers",
    Director: {
      Name: "David Dobkin",
      About: "NA"
    },
    Genre: {
      Name: "Comedy"
    }
  },
  {
    Title: "Friday",
    Director: {
      Name: "F. Gary Gray",
      About: "NA"
    },
    Genre: {
      Name: "Comedy"
    }
  },
  {
    Title: "Stepbrothers",
    Director: {
      Name: "Adam McKay",
      About: "NA"
    },
    Genre: {
      Name: "Comedy"
    }
  },
  {
    Title: "Legends of the Fall",
    Director: {
      Name: "Edward Zwick",
      About: "NA"
    },
    Genre: {
      Name: "Drama"
    }
  }
];

//Create
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});

// READ requests
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//READ movies title
app.get("/movies/:Title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("We don't have that one");
  }
});

//READ movies genre
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("We don't have that one");
  }
});

//READ director about
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.Director.Name === directorName)
    .Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("We don't have that one");
  }
});

//UPDATE user info
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

//CREATE add movie to users list
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE movie from users list
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      title => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE deregister user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});

app.listen(8080, () => {
  console.log("Your app is listening on ports 8080");
});
