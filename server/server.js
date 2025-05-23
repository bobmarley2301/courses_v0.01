const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const coursesRouter = require("./routes/courses");
const usersRouter = require("./routes/users");
const contactsRouter = require("./routes/contact");
const codeRouter = require("./routes/code");

app.use("/api/course", coursesRouter);
app.use("/api", usersRouter);
app.use("/api/contact", contactsRouter);
app.use("/api", codeRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
