const {promisify} = require('util');

const mysql = require('mysql2/promise');
const google = require('googleapis');
const googleAuth = require('google-auth-library');

const googleApiSecrets = require('./google-api-secrets.json');

async function getData() {
  const mysql = require('mysql2/promise');
  const db = { host: 'localhost', user: 'root', database: 'products_dev' };
  const pool = await mysql.createPool(db);
  const sql = 'select * from products';
  const [rows, fields] = await pool.query(sql);
  await pool.end();
  return rows;
}

const jwtClient = new google.auth.JWT(
  googleApiSecrets.client_email,
  null,
  googleApiSecrets.private_key,
  ['https://www.googleapis.com/auth/spreadsheets'],
  null
);

function formatData(data) {
  const header = Object.keys(data[0]);
  const rows = data.map(row => {
    return header.map(name => row[name]);
  });
  return [header, ...rows];
}

async function updateSheet(data) {
  const tokens = await promisify(jwtClient.authorize.bind(jwtClient))();
  const sheets = google.sheets('v4');
  const values = sheets.spreadsheets.values;
  const batchUpdate = promisify(values.batchUpdate.bind(values));
  const response = await batchUpdate({
    auth: jwtClient,
    spreadsheetId: process.env.SPREADSHEET_ID,
    resource: {
      valueInputOption: 'USER_ENTERED',
      data: {
        values: formatData(data),
        range: 'Products!A1'
      }
    }
  });
}

async function main() {
  const data = await getData();
  await updateSheet(data);
}

main().catch((err) => {
  console.log("An error occurred:", err);
})