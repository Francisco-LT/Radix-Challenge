const { Equipment } = require('../models');
const { fn, literal } = require('sequelize');
const formidable = require('formidable');
const fs = require('fs');
const csv = require('csv-parser');


const createEquipmentLog = async (equipmentId, timestamp, value) => {
    const newEquipmentLog = await Equipment.create({ equipmentId, timestamp, value });
  
    return newEquipmentLog;
};

const uploadAndParseEquipmentCsv = async (req) => {
    const form = new formidable.IncomingForm();
    const results = [];

    const fileData = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(new Error('Error uploading file'));
        }
  
        if (!files.file) {
          return reject(new Error('No file uploaded'));
        }
  
        const filePath = files.file[0]?.filepath;
  
        if (!filePath) {
          return reject(new Error('No file uploaded'));
        }
  
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => {
            fs.unlinkSync(filePath);
            resolve(results);
          })
          .on('error', (err) => {
            console.error('Error parsing CSV:', err);
            reject(new Error('Error processing the file'));
          });
      });
    });

    return fileData;
};


const createEquipmentLogCSV = async (req) => {
    const parsedEquipmentlogs = await uploadAndParseEquipmentCsv(req);

    parsedEquipmentlogs.map((log => {
        if (log.timestamp && log.value && log.equipmentId) {
            Equipment.create(log);
        }
    }))
};

const getAveragesValues = async () => {
    const result = await Equipment.findAll({
      attributes: [
        'equipmentId',
        [
            fn('AVG', literal(`CASE WHEN timestamp BETWEEN NOW() - INTERVAL 1 DAY AND NOW() THEN value END`)),
            'avg_24h',
          ],
          [
            fn('AVG', literal(`CASE WHEN timestamp BETWEEN NOW() - INTERVAL 2 DAY AND NOW() THEN value END`)),
            'avg_48h',
          ],
          [
            fn('AVG', literal(`CASE WHEN timestamp BETWEEN NOW() - INTERVAL 7 DAY AND NOW() THEN value END`)),
            'avg_1week',
          ],
          [
            fn('AVG', literal(`CASE WHEN timestamp BETWEEN NOW() - INTERVAL 1 MONTH AND NOW() THEN value END`)),
            'avg_1month',
          ],
        ],
      group: ['equipmentId'],
    });

    return result;
  };

module.exports = {
    createEquipmentLog,
    createEquipmentLogCSV,
    getAveragesValues
}