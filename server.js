<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const apiRoutes = require('./routes/api');
require('dotenv').config();
=======
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const apiRoutes = require("./routes/api");
>>>>>>> parent of 76d2cd7... upd (briefController)

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
<<<<<<< HEAD

// Initialize multer for handling multipart/form-data
const upload = multer();
=======
app.use(fileupload());
>>>>>>> parent of 76d2cd7... upd (briefController)

// Initialize express-fileupload
app.use(fileUpload());

// Routes
<<<<<<< HEAD
app.use('/api', upload.fields([{ name: 'file' }, { name: 'technicalSpecifications' }]), apiRoutes);
=======
app.use("/api", apiRoutes);
>>>>>>> parent of 76d2cd7... upd (briefController)

const PORT = process.env.PORT || 5051;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
  console.log(`Emails sent to ${process.env.EMAIL_HEY} and ${process.env.EMAIL_KPM}`);
});