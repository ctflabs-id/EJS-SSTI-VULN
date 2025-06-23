const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'ctf-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// GET /settings -> tampilkan form login
app.get('/settings', (req, res) => {
  res.render('login', { message: null });
});

// POST /settings -> proses login + SSTI
app.post('/settings', (req, res) => {
  const { name, password } = req.body;
  const viewOptions = req.body.settings?.['view options'] || {};

  const template = `<%= message %>`;
  const context = { message: `Welcome ${name}` };

  try {
    req.session.username = name; // ✅ Simpan session login
    const result = ejs.render(template, context, viewOptions);
    res.send(result + `<br><br><a href="/logout">Logout</a>`);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

// ✅ LOGOUT ROUTE
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error saat logout');
    }
    res.redirect('/settings'); // kembali ke halaman login
  });
});

app.listen(3000, () => {
  console.log('CTFLabs running at http://localhost:3000/settings');
});
