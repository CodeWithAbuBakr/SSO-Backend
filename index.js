const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON and URL-encoded data with increased limit
app.use(express.json({ limit: '50mb' })); // Increase the limit as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const corsOptions = {
  origin: "https://localhost:3000", // or use http if not using https
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // if you need cookies or auth headers
};

app.use(cors(corsOptions));

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

/// Routes
// const saveEmailRoute = require("./routes/stats.route");

// app.use("/api/saveemail", saveEmailRoute);

const signinRoute = require("./routes/login.route");
app.use("/api/login", signinRoute);

const userInfo = require("./routes/stats.route");
app.use("/api/stats", userInfo);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
