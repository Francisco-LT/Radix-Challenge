const handleMessages = {
  errorMessages: {
    error500Message: 'Something went wrong',
    erroUploadCsv: 'Error uploading file.',
    noFileUploaded: 'No file uploaded',
    cantParseCSV: 'Error parsing CSV',
  },
  successMessages: {
    postEquipments: 'Log saved on database.',
    insertCSVEquipments: 'Error log saved on database.',
  },
};

const buildQueries = (timeInterval) => {
  return `CASE WHEN timestamp BETWEEN NOW() - INTERVAL ${timeInterval} AND NOW() THEN value END`;
};

module.exports = {
  buildQueries,
  handleMessages,
};
