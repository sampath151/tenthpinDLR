require("dotenv").config();
const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

// need to check for excel doc
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
// end here


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

global.__basedir = __dirname + "/..";

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application.  w w w w" });
});

require("./app/routes/client.routes")(app);
require("./app/routes/excel.routes")(app);
require("./app/routes/admin.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
