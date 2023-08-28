const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");
const fileupload = require("express-fileupload");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(fileupload());

// Route
// app.get("/", (req, res) => {
//   res.send("Home Paasage");
// });

app.post("/api/sendemail", async (req, res) => {
  const { name, phone, email, text, services } = req.body;
  try {
    const send_to = process.env.EMAIL_USER;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = process.env.EMAIL_USER;
    const subject = "Заявка с сайта pushkeen.ru";
    const message = `
      <p><b>Имя</b>: ${name}</p>
      <p><b>Телефон</b>: ${phone}</p>
      <p><b>Почта</b>: ${email}</p>
      <p><b>Описание идеи</b>: ${text}</p>
      <p><b>Тип услуги</b>: ${services}</p>
    `;
    const attachments = [
      {
        filename: req.files?.file.name,
        content: req.files?.file.data,
        // encoding: req.files?.file.encoding,
        contentType: req.files?.file.mimetype,
      },
    ];

    await sendEmail(
      attachments,
      subject,
      message,
      send_to,
      sent_from,
      reply_to
    );
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const PORT = process.env.PORT || 5058;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
