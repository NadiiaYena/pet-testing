const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5001;

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Замість '*' можна вказати конкретний домен
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
//   });
app.use(cors({
    origin: 'http://localhost:3000', // Дозволяє запити з вашого фронтенду
    methods: ['GET', 'POST', 'OPTIONS'], // Дозволяє GET, POST і OPTIONS запити
    allowedHeaders: ['Content-Type'] // Дозволяє заголовок Content-Type
  }));
app.use(bodyParser.json());


const auth = new google.auth.GoogleAuth({
  keyFile: '../credentials.json', // вкажіть шлях до файлу облікових даних
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

// Ендпоінт для імпортування питань
app.post('/import', async (req, res) => {
  const { sheetId, range } = req.body;
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    });
    const rows = response.data.values;
console.log(rows)
    // Перетворення рядків таблиці в JSON
    if (rows.length) {
    //   const headers = rows[0]; // Перше рядок - заголовки
      const data = rows.slice(1); // Решта - дані

      const result = data.map(row => {
        return {
        //   [headers[0]]: row[0], // Питання
        //   [headers[1]]: row[1]  // Відповідь
        "Question": row[0], // Питання
        "Answear": row[1]  // Відповідь

        };
      });
      res.status(200).send(result);
    } else {
        res.status(404).send('No data found.');
    }
  } catch (error) {
    console.error('Error exporting answers:', error); 
    res.status(500).send(error.message);
  }
});

// Ендпоінт для експортування відповідей
app.post('/export', async (req, res) => {
  const { sheetId, range, values } = req.body;
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: range,
      valueInputOption: 'RAW',
      resource: { values: values },
    });
    res.status(200).send('Data updated successfully');
  } catch (error) {
    console.error('Error exporting answers:', error); 
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
