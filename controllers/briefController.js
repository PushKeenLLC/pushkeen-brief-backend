const sendEmail = require("../utils/sendEmail");

exports.sendBrief = async (req, res) => {
  const {
    briefType,
    name,
    phone,
    email,
    projectName,
    companyName,
    fieldOfActivity,
    products,
    clients,
    competitors,
    advantages,
    tasks,
    deadlines,
    offers,
    site,
    sections,
    stuff,
    favSites,
    hateSites,
    features,
    other,
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
      </br>
      <p>КОМПАНИЯ И РЫНОК</p>
      <p><b>Название вашей компании</b>: ${companyName ? companyName : "-"}</p>
      <p><b>Расскажите, чем занимается ваша компания?</b>: ${fieldOfActivity ? fieldOfActivity : "-"}</p>
      <p><b>Расскажите, какие продукты/услуги вы предлагаете клиентам?</b>: ${products ? products : "-"}</p>
      <p><b>Кто ваши клиенты? Расскажите о сегментах вашей аудитории. Какой их сегментов вы считаете ключевым? Если вы планируете охватывать новые сегменты аудитории, расскажите, какие</b>: ${
        clients ? clients : "-"
      }</p>
      <p><b>Кто ваши ключевые конкуренты? По возможности, прикрепите ссылки на их сайты и/или социальные сети</b>: ${
        competitors ? competitors : "-"
      }</p>
      <p><b>Какое преимущество выделяет вас среди конкурентов</b>: ${advantages ? advantages : "-"}</p>

      </br>
      </br>
      <p>ОЖИДАНИЯ </p>
      <p><b>Какую задачу должен решать продукт/проект?</b>: ${tasks ? tasks : "-"}</p>
      <p><b>В какие сроки нужно завершить работу?</b>: ${deadlines ? deadlines : "-"}</p>
      <p><b>Рассматриваете ли вы предложения от других компаний? Как вы будете выбирать партнёра? Когда вы планируете принять решение?</b>: ${
        offers ? offers : "-"
      }</p>

      ${
        briefType?.includes("Web-разработка")
          ? `</br>
       </br>
       <p>УСЛУГА: ВЕБ-РАЗРАБОТКА</p>
       <p><b>Если у вас есть документ с ТЗ или уже готовый прототип, прикрепите его здесь</b>: ${
         req.files?.technicalSpecifications ? "Название файла - " + req.files.technicalSpecifications.name : "-"
       }</p>
       <p><b>Предполагаете ли вы создание одностраничного или многостраничного сайта?</b>: ${site ? site : "-"}</p>
       <p><b>Укажите предполагаемые разделы вашего будущего сайта</b>: ${sections ? sections : "-"}</p>
       <p><b>Есть ли у вас качественные фото- или видео-материалы для размещения на сайте?</b>: ${stuff ? stuff : "-"}</p>
       <p><b>Поделитесь ссылками на сайты, которые вам нравятся. Расскажите, почему они нравятся</b>: ${favSites ? favSites : "-"}</p>
       <p><b>Поделитесь ссылками на сайты, которые вам не нравятся. Почему они не нравятся?</b>: ${hateSites ? hateSites : "-"}</p>
       <p><b>Укажите услуги, кроме разработки сайта, которые вам необходимы</b>: ${features ? features.join(", ") : "-"}</p>
       <p><b>Здесь вы можете указать другие пожелания к сайту, о которых мы не спросили:</b>: ${other ? other : "-"}</p>`
          : ""
      }
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

    await sendEmail(attachments, subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Brief Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};