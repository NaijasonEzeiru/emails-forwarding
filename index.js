const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: [
      'http://127.0.0.1:5500',
      'http://localhost',
      'https://dynamictotalservices.com.au',
      'https://www.dynamictotalservices.com.au',
      'https://dynamic-total-services.onrender.com'
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>Email Forward Backend</h1>');
});
app.post('/dts', (req, res) => {
  console.log(req.body);
  const html = Object.keys(req.body)?.map((key, index) => {
    return `<h3>${key}:</h3> <p>${req.body[key]}</p>`;
  });
  console.log(html.join(' '));
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: 'jayseehe1035@gmail.com', pass: 'sveboccesvoaxrep' }
  });
  var mailOptions = {
    from: req.body.email,
    // "DTS <email>"
    // to: 'ezeiruchibuike@gmail.com',
    to: 'admin@dynamictotalservices.com.au',
    subject: req.body.subject,
    html: `<div>${html.join(' ')}</div>`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'Email not submmitted. something went wrong' });
    } else {
      console.log(info.response);
      return res.status(204).json({ message: 'Form submitted successfully' });
    }
  });
});
app.listen(PORT, () => console.log('server running on port: ' + PORT));

module.exports = app;
