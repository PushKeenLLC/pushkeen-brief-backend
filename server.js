const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const apiRoutes = require("./routes/api");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(fileupload());

// Routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5051;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
  console.log(`Emails sent to ${process.env.EMAIL_HEY} and ${process.env.EMAIL_KPM}`);
});