const {
  createEquipmentLog,
  getAveragesValues,
} = require('../src/services/equipment.service');
const { Equipment } = require('../src/models');
const sinon = require('sinon');

describe('Service Unit Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should create a new equipment log', async () => {
    const mockData = {
      equipmentId: 'EQ-123',
      timestamp: new Date(),
      value: 100,
    };

    sinon.stub(Equipment, 'create').resolves(mockData);

    const result = await createEquipmentLog(
      mockData.equipmentId,
      mockData.timestamp,
      mockData.value
    );

    expect(result).toEqual(mockData);
    expect(Equipment.create.calledOnce).toBe(true);
  });

  it('Should get average values from the equipent logs', async () => {
    const mockAverages = [
      {
        equipmentId: 'EQ-123',
        avg_24h: 50,
        avg_48h: 60,
        avg_1week: 70,
        avg_1month: 80,
      },
    ];

    sinon.stub(Equipment, 'findAll').resolves(mockAverages);

    const result = await getAveragesValues();

    expect(result).toEqual(mockAverages);
    expect(Equipment.findAll.calledOnce).toBe(true);
  });
});
