const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");
const multer = require("multer");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route
app.get("/", (_, res) => {
  res.send("Home Page");
});

app.post("/api/sendemail", upload.single('file'), async (req, res) => {
  const { name, phone, email, text, services } = req.body;
  try {
    const send_to = [process.env.EMAIL_HEY, process.env.EMAIL_KPM];
    const sent_from = process.env.EMAIL_HEY;
    const reply_to = process.env.EMAIL_HEY;
    const subject = "Бриф с сайта pushkeen.ru";

    const message = `
      <p><b>Имя</b>: ${name}</p>
      <p><b>Телефон</b>: ${phone}</p>
      <p><b>Почта</b>: ${email}</p>
      <p><b>Описание идеи</b>: ${text}</p>
      <p><b>Тип услуги</b>: ${services}</p>
    `;

    const attachments = req.file ? [{
      filename: req.file.originalname,
      content: req.file.buffer,
      contentType: req.file.mimetype,
    }] : [];

    await sendEmail(attachments, subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/api/brief", upload.fields([
  { name: 'technicalSpecifications', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
  { name: 'brandBook', maxCount: 1 }
]), async (req, res) => {
  const {
    briefType, name, phone, email, projectName, companyName, fieldOfActivity,
    products, clients, competitors, advantages, tasks, deadlines, offers,
    site, sections, stuff, favSites, hateSites, features, other
  } = req.body;

  try {
    const send_to = [process.env.EMAIL_HEY, process.env.EMAIL_KPM];
    const sent_from = process.env.EMAIL_HEY;
    const reply_to = process.env.EMAIL_HEY;
    const subject = "Бриф с сайта pushkeen.ru";

    const message = `
      <p><b>Имя</b>: ${name || "-"}</p>
      <p><b>Телефон</b>: ${phone || "-"}</p>
      <p><b>Почта</b>: ${email || "-"}</p>
      <p><b>Название проекта</b>: ${projectName || "-"}</p>
      ...
    `;

    const attachments = [];
    if (req.files?.technicalSpecifications) {
      attachments.push({
        filename: req.files.technicalSpecifications[0].originalname,
        content: req.files.technicalSpecifications[0].buffer,
        contentType: req.files.technicalSpecifications[0].mimetype
      });
    }
    if (req.files?.logo) {
      attachments.push({
        filename: req.files.logo[0].originalname,
        content: req.files.logo[0].buffer,
        contentType: req.files.logo[0].mimetype
      });
    }
    if (req.files?.brandBook) {
      attachments.push({
        filename: req.files.brandBook[0].originalname,
        content: req.files.brandBook[0].buffer,
        contentType: req.files.brandBook[0].mimetype
      });
    }

    await sendEmail(attachments, subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Brief Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const PORT = process.env.PORT || 5051;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
  console.log(`Emails sent to ${process.env.EMAIL_HEY} and ${process.env.EMAIL_KPM}`);
});
