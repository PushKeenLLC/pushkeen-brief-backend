const express = require('express');
const cors = require('cors');
const multer = require('multer');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Initialize multer for handling multipart/form-data
const upload = multer();

// Routes
app.use('/api', upload.fields([
  { name: 'file' },
  { name: 'technicalSpecifications' },
  { name: 'logo' },
  { name: 'brandBook' }
]), apiRoutes);

const PORT = process.env.PORT || 5051;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
  console.log(`Emails sent to ${process.env.EMAIL_HEY} and ${process.env.EMAIL_KPM}`);
});
