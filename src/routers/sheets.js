const express = require("express");
const { google } = require('googleapis');
//const credentials = require('../token.json'); // Replace with the correct path
//const sheets = google.sheets('v4');
require("dotenv").config();
const file_path = process.env.file_path;
const save_in_data = async(req) => {




    // Format data into rows
    const rows = [req.body.name, req.body.phone, req.body.email, req.body.address, req.body.income, req.body.savings];



    const auth = new google.auth.GoogleAuth({ keyFile: file_path, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });

    const auth_client_object = await auth.getClient();
    const spreadsheetId = process.env.spreadsheet_id;
    const sheetName = 'Data';
    // const resource = {
    //     values: rows
    //     };

    const google_sheets_instance = google.sheets({
        version: 'v4',
        auth: auth_client_object
    })

    await google_sheets_instance.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Data!A2:F2", // Specify the range where data will be appended
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [rows],
        }
    });
    console.log("updated");
    // console.log(`${result.data.updates.updatedCells} cells appended.`);
};

module.exports = save_in_data;