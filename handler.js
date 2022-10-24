const serverless = require('serverless-http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const fetch = (...args) => 
  import ('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.use(cors());

const jsonParser = bodyParser.json();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAILER_PASS
  },
  secure: true
});

const makeHTML = (list) => {
  return list.map((item) => `<li>${item}</li>`).join('');
};

// app.post('/', jsonParser, (req, res, next) => {
//   fetch(`${process.env.BASE_URL}/api/v1/users?search=profile.email%20eq%20%22${req.body.email}%22`
//   , {
//     headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json",
//       "Authorization": `SSWS ${process.env.API_TOKEN}`
//     }
//   })
//   .then(response => response.json())
//   .then(json => {
//     const logins = [];
//     json.map((item) => {
//       logins.push(item.profile.login)
//     });
//     const mailData = {
//       from: process.env.MAILER,
//       to: req.body.email,
//       subject: "Forgotten Login Name(s)",
//       text: "text",
//       html: `<span>logins</span><ol>${makeHTML(logins)}</ol>`
//     }
//     transporter.sendMail(mailData, (error, info) => {
//       if (error) {
//         return console.log(error);
//       }
//       res.statusCode(200).json(`sent mail to ${req.body.email}`);
//     })
//   })
// })

app.get('/test', (req, res) => {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => res.json(json))
  // res.json({msg: 'okta service lambda home'});
});

module.exports.handler = serverless(app)