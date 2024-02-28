const nodemailer = require("nodemailer");

const sendEmail = async (
  attachments,
  subject,
  message,
  send_to,
  sent_from,
  reply_to
  ) => {
  const transporter = nodemailer.createTransport({
    service: "yandex",
    host: process.env.EMAIL_HOST,
    port: "465",
    secure: true,
    auth: {
      user: process.env.EMAIL_HEY,
      pass: process.env.EMAIL_PASS_HEY,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
    attachments: attachments,
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
