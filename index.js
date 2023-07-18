const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const videoRouter = require("./components/video/routes");
const authRouter = require("./components/auth/routes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/videos", videoRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/public", express.static(path.join(__dirname, "public")));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
