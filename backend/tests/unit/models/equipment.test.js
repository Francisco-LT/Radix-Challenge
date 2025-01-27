// tests/unit/models/user.test.js

const { checkPropertyExists } = require('sequelize-test-helpers');
const { Equipment } = require('../../../src/models');
const chai = require('chai');
const { Sequelize } = require('sequelize');

const { expect } = chai;
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

after(async () => {
    await sequelize.close();
});

before(async () => {
    await sequelize.sync({ force: true });
  });

  describe('The Equipments model', () => {
    const equipment = new Equipment();
  
    it ('should have the proprieties "value, timestamp, equipmentId"', () => {
      ['value', 'timestamp', 'equipmentId'].forEach(checkPropertyExists(equipment));
    });

    it('should create a new equipment log', async () => {
        const equipment = await Equipment.create({
            equipmentId: 'EQ-123451016',
            timestamp: '2023-02-15T01:30:00.000-05:00',
            value: 100
        });

        expect(equipment.equipmentId).to.be.equal('EQ-123451016');
        expect(equipment.value).to.be.equal(100);
    });
});