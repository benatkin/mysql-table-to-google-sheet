# mysql-table-to-google-sheet example

1. Go to the wizard at https://console.developers.google.com/start/api?id=sheets.googleapis.com to get a google sheets API key following the directions in Step 1 at https://developers.google.com/sheets/api/quickstart/nodejs#step_1_turn_on_the_api_name
2. Move the downloaded json credential file to `google-api-secrets.json` in this directory
3. Go to Google sheets, create a google sheet, change the name of the first sheet from Sheet1 to Products
4. Copy the ID of the sheet in the URL and put it the `SPREADSHEET_ID` environment variable: `export SPREADSHEET_ID='1ZlKUI7JP4ffMLv2s5jRBZLQ5njMYJKDEe_EW9tU8e60`
5. Copy the `client_email` value in `google-api-secrets.json`
6. Click the Share button and paste the email address from the previous step into it. Give it permission to edit.
7. Run `mysql` and `create database products_dev;` in the console, and exit out of it
8. Load the schema and data by running `mysql < mysql-products.sql`
9. Run `node index.js`
10. Check the sheet. If there's no output, that probably means it worked!

## TODO

* add integration test
* set up CI
* use categories table to get name of category
* clear out extra rows at the end
