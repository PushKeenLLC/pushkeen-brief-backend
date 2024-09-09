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

    // Формируем сообщение, учитывая данные массивов
    const message = `
      <p><b>Имя</b>: ${name || "-"}</p>
      <p><b>Телефон</b>: ${phone || "-"}</p>
      <p><b>Почта</b>: ${email || "-"}</p>
      <p><b>Название проекта</b>: ${projectName || "-"}</p>

      </br></br>
      <p>КОМПАНИЯ И РЫНОК</p>
      <p><b>Название вашей компании</b>: ${companyName || "-"}</p>
      <p><b>Расскажите, чем занимается ваша компания?</b>: ${fieldOfActivity || "-"}</p>
      <p><b>Расскажите, какие продукты/услуги вы предлагаете клиентам?</b>: ${products || "-"}</p>
      <p><b>Кто ваши клиенты? Расскажите о сегментах вашей аудитории:</b> ${clients || "-"}</p>
      <p><b>Кто ваши ключевые конкуренты?</b>: ${competitors || "-"}</p>
      <p><b>Какое преимущество выделяет вас среди конкурентов</b>: ${advantages || "-"}</p>

      </br></br>
      <p>ОЖИДАНИЯ</p>
      <p><b>Какую задачу должен решать продукт/проект?</b>: ${tasks || "-"}</p>
      <p><b>В какие сроки нужно завершить работу?</b>: ${deadlines || "-"}</p>
      <p><b>Рассматриваете ли вы предложения от других компаний?</b>: ${offers || "-"}</p>

      ${
        briefType?.includes("Web-разработка")
          ? `
            </br></br>
            <p>УСЛУГА: ВЕБ-РАЗРАБОТКА</p>
            <p><b>Техническое задание (ТЗ):</b> ${
              req.files?.technicalSpecifications
                ? `Название файла - ${req.files.technicalSpecifications.name}`
                : "-"
            }</p>
            <p><b>Предполагаемые разделы сайта:</b> ${sections || "-"}</p>
            <p><b>Материалы для сайта:</b> ${stuff || "-"}</p>
            <p><b>Любимые сайты:</b> ${favSites || "-"}</p>
            <p><b>Нелюбимые сайты:</b> ${hateSites || "-"}</p>
            <p><b>Необходимые функции:</b> ${features ? features.join(", ") : "-"}</p>
            <p><b>Другие пожелания:</b> ${other || "-"}</p>
          `
          : ""
      }
    `;

    // Формируем список вложений
    const attachments = [
      req.files?.technicalSpecifications && {
        filename: req.files.technicalSpecifications.name,
        content: req.files.technicalSpecifications.data,
        contentType: req.files.technicalSpecifications.mimetype,
      },
      req.files?.logo && {
        filename: req.files.logo.name,
        content: req.files.logo.data,
        contentType: req.files.logo.mimetype,
      },
      req.files?.brandBook && {
        filename: req.files.brandBook.name,
        content: req.files.brandBook.data,
        contentType: req.files.brandBook.mimetype,
      },
    ].filter(Boolean); // Исключаем undefined

    // Отправляем email
    await sendEmail(attachments, subject, message, send_to, sent_from, reply_to);

    // Ответ пользователю
    res.status(200).json({ success: true, message: "Brief Sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
