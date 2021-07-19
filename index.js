const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const users = require("./routes/users");
const auth = require("./routes/auth")
const posts = require("./routes/posts")

dotenv.config();

mongoose
  .connect(process.env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongoDb.."))
  .catch((err) => console.log("Could not connect to mongoDb..", err));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Welcome home");
});

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/posts", posts);

app.listen(8800, () => console.log("Backend Server is running"));
