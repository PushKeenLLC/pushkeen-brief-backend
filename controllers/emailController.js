const sendEmail = require('../utils/sendEmail');

exports.sendEmail = async (req, res) => {
  const { name, phone, email, text, services } = req.body;
  try {
    const send_to = [process.env.EMAIL_HEY, process.env.EMAIL_KPM];
    const sent_from = process.env.EMAIL_HEY;
    const reply_to = process.env.EMAIL_HEY;
    const subject = 'Бриф с сайта pushkeen.ru';

    const message = `
      <p><b>Имя</b>: ${name}</p>
      <p><b>Телефон</b>: ${phone}</p>
      <p><b>Почта</b>: ${email}</p>
      <p><b>Описание идеи</b>: ${text}</p>
      <p><b>Тип услуги</b>: ${services}</p>
    `;

    const attachments = [
      req.files?.file && {
        filename: `file_${req.files.file[0].originalname}`,
        content: req.files.file[0].buffer,
        contentType: req.files.file[0].mimetype,
      },
    ].filter(Boolean);

    await sendEmail(attachments, subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: 'Email Sent' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
