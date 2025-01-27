const request = require('supertest');
const app = require('../src/app');
const { Equipment } = require('../src/models');
const sinon = require('sinon');
const fs = require('fs');
const path = require('path');

describe('Testing Controller Integration', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should send a POST request to /equipments endpoint and should save log on our database and return success', async () => {
    sinon.stub(Equipment, 'create').resolves({});

    const res = await request(app)
      .post('/equipments')
      .send({ equipmentId: 'EQ-123', timestamp: new Date(), value: 100 });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe('Log saved on database.');
  });

  it('Should send a POST request to /equipments/uploadError endpoint, upload a CSV file and return success', async () => {
    const filePath = path.join(__dirname, 'mocks', 'equipmentErrors.csv');
    const res = await request(app)
      .post('/equipments/uploadError')
      .attach('file', filePath);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe('Error log saved on database.');
  });

  it('Should send a POST request to /equipments and check the response', async () => {
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

    const res = await request(app).get('/equipments');

    expect(res.status).toBe(200);
    expect(res.body.averageValue).toEqual(mockAverages);
  });
});
