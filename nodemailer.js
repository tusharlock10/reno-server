const nodemailer = require('nodemailer'),
  ejs = require('ejs'),
  transporter = nodemailer.createTransport({
    service: 'Zoho',
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,

    auth: {
      user: process.env.email,
      pass: process.env.pass
    }
  });

module.exports = {
  async successRegisterMail(clientEmail, name) {
    ejs.renderFile(__dirname + '/views/register.ejs', { name }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: process.env.email,
          to: clientEmail,
          subject: 'Registration successful at RENO',
          html: data
        };
        

        transporter.sendMail(mainOptions, function(err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log('Message sent: ' + info.response);
          }
        });
      }
    });
  }
};
