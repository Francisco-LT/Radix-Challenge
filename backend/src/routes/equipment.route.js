const route = require('express').Router();
const equipmentController = require('../controllers/equipment.controller');

route.post('/equipments', equipmentController.insertEquipmentLogs);
route.post('/equipments/uploadError', equipmentController.insertEquipmentLogsCSV);
route.get('/equipments', equipmentController.getAvarageValuesByEquipment);

module.exports = route;