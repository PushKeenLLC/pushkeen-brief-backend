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
app.get("/", (_, res) => {
  res.send("Home Page");
});


app.post("/api/sendemail", async (req, res) => {
  const { name, phone, email, text, services } = req.body;
  try {
    const send_to = [process.env.EMAIL_HEY, process.env.EMAIL_KPM];
    const sent_from = process.env.EMAIL_HEY;
    const reply_to = process.env.EMAIL_HEY;
    const subject = "Бриф  с сайта pushkeen.ru";
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

app.post("/api/brief", async (req, res) => {
  const {
    name,
    phone,
    email,
    projectName,
    companyName,
    fieldOfActivity,
    competitors,
    services,
    audience,
    advantages,
    clientProblems,
    comparison,
    qualityPhotos,
    // technicalSpecifications,
    idea,
    sections,
    sitePrototype,
    // logo,
    // brandBook,
    siteLove,
    siteHate,
    siteFunction,
    sitePages,
    features,
    additionally,
  } = req.body;
  try {
    const send_to = [process.env.EMAIL_HEY, process.env.EMAIL_KPM];
    const sent_from = process.env.EMAIL_HEY;
    const reply_to = process.env.EMAIL_HEY;
    const subject = "Бриф с сайта pushkeen.ru";
    const message = `
    <p><b>Имя</b>: ${name ? name : "-"}</p>
    <p><b>Телефон</b>: ${phone ? phone : "-"}</p>
    <p><b>Почта</b>: ${email ? email : "-"}</p>
    <p><b>Название проекта</b>: ${projectName ? projectName : "-"}</p>

      </br>
      <p>ИНФОРМАЦИЯ О КОМПАНИИ</p>
      <p><b>Название компании</b>: ${companyName ? companyName : "-"}</p>
      <p><b>Сфера деятельности</b>: ${
        fieldOfActivity ? fieldOfActivity : "-"
      }</p>
      <p><b>Вы знаете ваших конкурентов в сети? Если да, дайте на них ссылки:</b>: ${
        competitors ? competitors : "-"
      }</p>

      </br>
      <p>ДЕЯТЕЛЬНОСТЬ ЗАКАЗЧИКА</p>
      <p><b>Продукция, услуги</b>: ${services ? services : "-"}</p>
      <p><b>Кто является целевой аудиторией вашего товара/услуги?</b>: ${
        audience ? audience : "-"
      }</p>
      <p><b>Выделите ключевое преимущество продукта/услуги:</b>: ${
        advantages ? advantages : "-"
      }</p>
      <p><b>С какими проблемами к вам приходит клиент?</b>: ${
        clientProblems ? clientProblems : "-"
      }</p>
      <p><b>На что опирается клиент, сравнивая ваш продукт с продуктом конкурента? Какие критерии являются основными при принятии решении о покупке?</b>: ${comparison}</p>
      <p><b>У вас есть качественные фото/видео материалы для сайта?</b>: ${
        qualityPhotos ? qualityPhotos : "-"
      }</p>

       </br>
      <p>ПОДРОБНЕЕ О ПРОЕКТЕ</p>
      <p><b>У вас есть ТЗ или пожелания по проекту?</b>: ${
        req.files?.technicalSpecifications
          ? "Название файла - " + req.files?.technicalSpecifications.name
          : "-"
      }</p>
      <p><b>Есть ли у вас особая идея? Возможно у вас есть особое видение будущего сайта?</b>: ${
        idea ? idea : "-"
      }</p>
      <p><b>Укажите предполагаемые основные разделы вашего будущего сайта (структуру)</b>: ${
        sections ? sections : "-"
      }</p>
      <p><b>Есть ли у вас прототип будущего сайта?</b>: ${
        sitePrototype ? sitePrototype : "-"
      }</p>

       </br>
      <p>ДИЗАЙН</p>
      <p>Вид дизайна</p>
      <p><b>Логотип</b>: ${
        req.files?.logo ? "Название файла - " + req.files.logo.name : "-"
      }</p>
      <p><b>Дополнительно</b>: ${
        req.files?.brandBook
          ? "Название файла - " + req.files.brandBook.name
          : "-"
      }</p>
      <p><b>Сайты, которые нравятся</b>: ${siteLove ? siteLove : "-"}</p>
      <p><b>Сайты, которые не нравятся</b>: ${siteHate ? siteHate : "-"}</p>

      </br>
      <p>ФУНКЦИОНАЛЬНОСТЬ САЙТА</p>
      <p><b>Какой сайт можно взять за пример полностью или с частью функционала. Опишите отличия и разницу</b>: ${
        siteFunction ? siteFunction : "-"
      }</p>
      <p><b>Опишите какие страницы должны быть? (Главная страница, страницы категорий/разделов, страница «О нас»,…)</b>: ${
        sitePages ? sitePages : "-"
      }</p>
      <p><b>Что из этого необходимо? (Админ панель, Перенос контента со старого сайта на новый, SEO оптимизация, Интеграция системы метрик)</b>: ${
        features ? features : "-"
      }</p>
      <p><b>Дополнение, замечания, пожелания, требования по сайту</b>: ${
        additionally ? additionally : "-"
      }</p>
    `;

    const attachments = [
      {
        filename: req.files?.technicalSpecifications?.name,
        content: req.files?.technicalSpecifications?.data,
        contentType: req.files?.technicalSpecifications?.mimetype,
      },
      {
        filename: req.files?.logo?.name,
        content: req.files?.logo?.data,
        contentType: req.files?.logo?.mimetype,
      },
      {
        filename: req.files?.brandBook?.name,
        content: req.files?.brandBook?.data,
        contentType: req.files?.brandBook?.mimetype,
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
