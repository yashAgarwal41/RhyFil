const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
// const csv = require('fast-csv');
const csv = require('csv-parser');
const path = require('path');
const papa = require('papaparse');
const ExcelJS = require('exceljs');
const excel = require('excel4node');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/login.html");
})

app.use(express.static('public'));
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rhyfil',
    waitForConnections: true,
    connectionLimit: 10
})

//multer config..
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


app.post('/import-csv', upload.single('file'), async (req, res) => {
    try {
        const uploadedFilePath = path.join(__dirname, "uploads", req.file.filename);

        await uploadCsv(uploadedFilePath, req, res);
        res.status(201).json({ message: 'File uploaded and processed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during file processing.' });
    }
});

async function uploadCsv(filePath, req, res) {
    return new Promise(async (resolve, reject) => {
        const uploadedFileName = path.basename(filePath, path.extname(filePath));
        // const uploadedFileName = req.file.filename;
        const platform = req.body.platform;
        let platformNameInFile = platform;
        // Check if the uploaded file name starts with the selected platform name
        if (platform == 'youtube') platformNameInFile = 'yt';
        if (platform == 'snapchat') platformNameInFile = 'snap';
        if (!uploadedFileName.toLowerCase().startsWith(platformNameInFile.toLowerCase())) {
            res.status(400).json({ error: 'Wrong file chosen. Please select the correct platform.' });
            return;
        }

        // File Duplication Check..
        const fileCheckResult = await checkFile(uploadedFileName);
        if (fileCheckResult.error) {
            res.status(400).json({ error: 'File already exists in the platform.' });
            return;
        }

        const table = platform;

        // Extract month and year from the file name
        const [_, month, year] = uploadedFileName.match(/(\d{2})_(\d{4})/);

        const columnNames = [];
        const csvDataCol = [];

        const stream = fs.createReadStream(filePath)
            .pipe(csv({ // Use the csv-parser library here
                separator: ',', // Specify the separator (comma)
                quote: '"' // Specify the quote character (double quote)
            }))
            .on('data', async function (data) {
                if (columnNames.length === 0) {
                    // The first row contains column names
                    columnNames.push(...Object.keys(data));
                } else {
                    // Process data rows
                    const rowData = {};

                    // Match columns by name
                    for (const columnName of columnNames) {
                        rowData[columnName] = data[columnName] || null;
                    }

                    // Check if the 'reporting_month' column is present before formatting
                    if (rowData.hasOwnProperty('reporting_month')) {
                        const originalDate = rowData.reporting_month;
                        rowData.reporting_month = originalDate;
                    }
                    if(rowData.hasOwnProperty('royality')){
                        const royalityAfterDeduction = 0.9*(rowData.royality)
                        rowData.royality = royalityAfterDeduction;
                    }

                    rowData.month = month;
                    rowData.year = year;
                    csvDataCol.push(rowData);
                }
            })
            .on('end', async function () {
                // Now csvDataCol contains an array of objects where each object
                // represents a row with columns mapped by column names.

                // Get the table columns from the database
                const [tableColumns] = await pool.execute(`DESCRIBE ${table}`);

                // Extract column names from the tableColumns result
                const tableColumnNames = tableColumns.map(column => column.Field);

                // Insert data into the database using the csvDataCol array
                const connection = await pool.getConnection();
                try {
                    for (const rowData of csvDataCol) {
                        // Construct dynamic SQL query based on available columns
                        const validColumns = tableColumnNames.filter(columnName => rowData.hasOwnProperty(columnName));
                        const query = `INSERT INTO ${table} (${validColumns.join(', ')}) VALUES (${validColumns.map(() => '?').join(', ')})`;
                        const values = validColumns.map(columnName => rowData[columnName]);

                        await connection.query(query, values);
                    }
                    console.log("Data inserted successfully!");
                } catch (error) {
                    console.error("Error in database operations:", error);
                } finally {
                    connection.release();
                }

                // File Duplication Check..
                const fileInsertedMessage = await insertFile(uploadedFileName);
                res.status(201).json({ message: 'File uploaded and processed successfully.' });
            });
    });
}


async function checkFile(uploadedFileName) {
    try {
        const existingFile = await pool.query('select * from file_names where file_name = ?', [uploadedFileName]);
        // console.log("Files are: ", existingFile);
        // console.log("length is: ", existingFile[0].length);

        if (existingFile[0].length > 0) {
            res.status(400).json({ error: 'File already exists in the platform.' }); // Send error message to frontend
            return;
        }

        return { success: true };
        // resolve(); // Resolve the promise indicating successful execution
    } catch (error) {
        return { error };
        reject(error); // Reject the promise if an error occurs
    }
}

async function insertFile(uploadedFileName) {
    try {
        // Insert file_name into files
        await pool.query('insert into file_names values (?)', uploadedFileName);
        return { success: true };
        resolve(); // Resolve the promise indicating successful execution
    } catch (error) {
        return { error };
        reject(error); // Reject the promise if an error occurs
    }
}


app.get('/fetch-data/:isrcCode', async (req, res) => {
    try {
        const isrcCode = req.params.isrcCode;
        const fetchedData = {};

        // Fetch data from each platform table based on ISRC code
        const platformNames = ['Spotify', 'wynk', 'Youtube', 'Apple', 'Tiktok', 'Snapchat', 'Resso', 'Amazon', 'JioSaavn', 'Gaana', 'Facebook', 'Hungama'];
        for (const platform of platformNames) {
            const query = `SELECT * FROM ${platform} WHERE isrc = ?`;
            const [rows] = await pool.query(query, [isrcCode]);
            fetchedData[platform] = rows;
        }

        // Create a new workbook
        const workbook = new ExcelJS.Workbook();

        // Loop through each platform's data and add a sheet
        for (const platform of platformNames) {
            const platformData = fetchedData[platform];
            if (platformData && platformData.length > 0) {
                const sheet = workbook.addWorksheet(platform);

                // Add headers to the sheet
                const headerRow = Object.keys(platformData[0]);
                sheet.addRow(headerRow);

                // Add data rows to the sheet
                for (const row of platformData) {
                    sheet.addRow(Object.values(row));
                }
            }
        }

        // Save the Excel file to a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Send the buffer as response to the client
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
        res.send(buffer);
    } catch (error) {
        console.error('Error in fetching or generating Excel file:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});


app.listen(3000, () => {
    console.log("Server is running on 3000");
})