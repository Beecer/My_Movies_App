const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myMoviesAppDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("hello world!!");
});

//Create New User Registration // NO Success
/* Expected JSON Format
{
  ID: Integer,
  UserName: Integer,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post("/users", (req, res) => {
  Users.findOne({ Name: req.body.Name }).then(user => {
    if (user) {
      return res.status(400).send(req.body.Name + " already exists");
    } else {
      Users.create({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        Birthday: req.body.Birthday
      })
        .then(user => {
          res.status(201).json(user);
        })
        .catch(error => {
          console.error(error);
          res.status(500).send("Error: " + error);
        });
    }
  });
});
// UPDATE User Info // Success
app.put("/users/:Name", (req, res) => {
  Users.findOneAndUpdate(
    { Name: req.params.Name },
    {
      $set: {
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Read list of users // Success
app.get("/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      console.err(err);
      res.status(500).send("Error: " + err);
    });
});

// READ list of movies // Success
app.get("/movies", (req, res) => {
  Movies.find()
    .then(movies => {
      res.status(201).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Read User info by name
app.get("/users/:Name", (req, res) => {
  Users.findOne({ Name: req.params.Name })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//READ movies title// Success
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then(movie => {
      res.json(movie);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//READ movies genre // Not correct
app.get("movies/genre/:Name", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.Name })
    .then(movie => {
      res.json(movie);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//READ director about // Not Correct
app.get("movies/director/:Name", (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(movie => {
      res.json(movie);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//UPDATE user info// No Success, updating info for top listed user only
app.put("/users/:id", (req, res) => {
  Users.findOneAndUpdate(
    { Name: req.params.Name },
    {
      $set: {
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email,
        Birth: req.body.Birth
      }
    },
    { new: true }, //This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//CREATE add movie to users list // No Success // Adds movie to first name on movie.JSON list(BC)
app.post("/users/:Name/movies/:movieID", (req, res) => {
  Users.findOneAndUpdate(
    { Name: req.params.Name },
    {
      $push: { FavoriteMovies: req.params.movieID }
    },
    { new: true }, //This line makes sure the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//DELETE user by name //No success, deleteing user at top of list
app.delete("/users/:Name", (req, res) => {
  Users.findOneAndRemove({ Name: req.params.Name })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.Name + " was not found");
      } else {
        res.status(200).send(req.params.Name + " was deleted");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.listen(8080, () => {
  console.log("Your app is listening on ports 8080");
});
