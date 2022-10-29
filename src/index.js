const express = require("express");
const router = express.Router();
const fs = require("fs");

const app = express();

app.use(express.json());

//Get all Method
router.get("/getmoviesList", (req, res) => {
  fs.readFile("./moviesList.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    res.send(jsonString);
  });
});

//Get by ID Method
router.get("/getTicketsInfo/:id", (req, res) => {
  const id = req.params["id"];
  if (id === 1) {
    fs.readFile("./ticketInfoBB.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      res.send(jsonString);
    });
  } else if (id === 2) {
    fs.readFile("./ticketInfoKGF.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      res.send(jsonString);
    });
  } else {
    res.send([]);
  }
});

//Update by ID Method
router.patch("/bookTicket", (req, res) => {
  const data = [];
  if (req.query.movieId === 1) {
    fs.readFile("./ticketInfoBB.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      data = jsonString;
    });
  } else if (req.query.movieId === 2) {
    fs.readFile("./ticketInfoKGF.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      data = jsonString;
    });
    data = data.map((value) => {
      if (value.id === req.body.id) {
        return {
          ...value,
          isFilled: true
        };
      } else {
        return {
          ...value
        };
      }
    });
    fs.writeFile("data.json", JSON.stringify(data), (err) => {
      // error checking
      if (err) throw err;
      console.log("New data added");
      res.send([{ ...req.body, userId: "123", status: "booked" }]);
    });
  }
});
