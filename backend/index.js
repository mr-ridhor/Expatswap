const express = require("express");
const db = require("./DB/DatabaseConnect");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
app.use(express.json());


const corsOptions = {
  origin: ["https://expatswaop.netlify.app/", "http://127.0.0.1:5173"],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
};
app.use(cors(corsOptions));

// Connect to MongoDB
db();

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Working...");
});
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
