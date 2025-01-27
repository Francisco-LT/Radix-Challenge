const { Equipment } = require('../models');
const { fn, literal } = require('sequelize');
const formidable = require('formidable');
const fs = require('fs');
const csv = require('csv-parser');
const { handleMessages, buildQueries } = require('../utils/messages');

const createEquipmentLog = async (equipmentId, timestamp, value) => {
  const newEquipmentLog = await Equipment.create({
    equipmentId,
    timestamp,
    value,
  });

  return newEquipmentLog;
};

const uploadAndParseEquipmentCsv = async (req) => {
  const form = new formidable.IncomingForm();
  const results = [];

  const fileData = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(new Error(handleMessages.errorMessages.erroUploadCsv));
      }

      if (!files.file) {
        return reject(new Error(handleMessages.errorMessages.noFileUploaded));
      }

      const filePath = files.file[0]?.filepath;

      if (!filePath) {
        return reject(new Error(handleMessages.errorMessages.noFileUploaded));
      }

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          fs.unlinkSync(filePath);
          resolve(results);
        })
        .on('error', (err) => {
          console.error(handleMessages.errorMessages.cantParseCSV, err);
          reject(new Error(handleMessages.errorMessages.cantParseCSV));
        });
    });
  });

  return fileData;
};

const createEquipmentLogCSV = async (req) => {
  const parsedEquipmentlogs = await uploadAndParseEquipmentCsv(req);

  parsedEquipmentlogs.map((log) => {
    if (log.timestamp && log.value && log.equipmentId) {
      Equipment.create(log);
    }
  });
};

const timeIntervalQueries = {
  oneDay: '1 DAY',
  twoDays: '2 DAY',
  oneWeek: '7 DAY',
  oneMonth: '1 MONTH',
};

const getAveragesValues = async () => {
  const result = await Equipment.findAll({
    attributes: [
      'equipmentId',
      [fn('AVG', literal(buildQueries(timeIntervalQueries.oneDay))), 'avg_24h'],
      [
        fn('AVG', literal(buildQueries(timeIntervalQueries.twoDays))),
        'avg_48h',
      ],
      [
        fn('AVG', literal(buildQueries(timeIntervalQueries.oneWeek))),
        'avg_1week',
      ],
      [
        fn('AVG', literal(buildQueries(timeIntervalQueries.oneMonth))),
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
  getAveragesValues,
};
