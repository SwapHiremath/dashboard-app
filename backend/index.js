const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

const port = 3001;

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// MySQL database connection
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12671894",
  password: "28FFXfBzDX",
  database: "sql12671894",
  port: "3306",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define a route to fetch data from MySQL
app.get("/city", (req, res) => {
  const query = "SELECT * FROM city limit 10";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
