const nodemailer = require('nodemailer');

async function sendVerificationEmail(email, code) {

  const params = new URLSearchParams(`email=${email}&code=${code}`);
  const link = `https://charody-staging.netlify.app/#/verify?${params.toString()}`;

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_UN,
      pass: process.env.SMTP_PW,
    },
  });

  await transporter.sendMail({
    from: '"Charody" <noreply@floydcode.com>',
    to: email,
    subject: 'Verify Your Charody Account',
    text: link,
    html: `<a href=${link}>Click here to verify your account</a>`,
  });

}

module.exports = {
  sendVerificationEmail
};
