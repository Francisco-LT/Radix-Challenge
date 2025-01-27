const equipmentService = require('../services/equipment.service');
const { handleMessages } = require('../utils/messages');

const error500Message = 'Something went wrong';

const insertEquipmentLogs = async (req, res) => {
  try {
    const { equipmentId, timestamp, value } = req.body;
    await equipmentService.createEquipmentLog(equipmentId, timestamp, value);

    return res
      .status(200)
      .json({ success: handleMessages.successMessages.postEquipments });
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ message: handleMessages.errorMessages.error500Message });
  }
};

const insertEquipmentLogsCSV = async (req, res) => {
  try {
    await equipmentService.createEquipmentLogCSV(req);

    return res
      .status(200)
      .json({ success: handleMessages.successMessages.insertCSVEquipments });
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ message: handleMessages.errorMessages.error500Message });
  }
};

const getAvarageValuesByEquipment = async (req, res) => {
  try {
    const averageValue = await equipmentService.getAveragesValues();

    return res.status(200).json({ averageValue });
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ message: handleMessages.errorMessages.error500Message });
  }
};

module.exports = {
  insertEquipmentLogs,
  insertEquipmentLogsCSV,
  getAvarageValuesByEquipment,
};
