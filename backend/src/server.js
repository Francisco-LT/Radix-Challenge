// src/server.js

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});


// const express = require('express');
// const formidable = require('formidable');
// const fs = require('fs');
// const path = require('path');
// const csv = require('csv-parser');

// const app = express();
// const port = 3001;

// // Endpoint for file upload using formidable
// app.post('/upload-csv', (req, res) => {
//   const form = new formidable.IncomingForm();
//   form.uploadDir = path.join(__dirname, 'uploads'); // Directory for saving files
//   form.keepExtensions = true; // Keep file extensions (e.g., .csv)
  
//   // Ensure uploads folder exists
//   if (!fs.existsSync(form.uploadDir)) {
//     fs.mkdirSync(form.uploadDir);
//   }

//   // Parse the form
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(500).send('Error uploading file');
//     }

//     console.log('Files:', files.file); // Log the files object to inspect it

//     if (!files.file) {
//       return res.status(400).send('No file uploaded');
//     }

//     const filePath = files.file[0]?.filepath; // Optional chaining to avoid errors if undefined
//     console.log('File path:', filePath); // Debug log the file path

//     if (!filePath) {
//       return res.status(400).send('No file uploaded');
//     }

//     const results = [];
    
//     // Parse the uploaded CSV file
//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on('data', (data) => results.push(data))
//       .on('end', () => {
//         console.log('CSV Data:', results);

//         // Optionally delete the uploaded file after parsing
//         fs.unlinkSync(filePath);

//         res.status(200).json({
//           message: 'CSV file uploaded and parsed successfully!',
//           data: results, // Send parsed data in response
//         });
//       })
//       .on('error', (err) => {
//         console.error('Error parsing CSV:', err);
//         res.status(500).send('Error processing the file');
//       });
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });