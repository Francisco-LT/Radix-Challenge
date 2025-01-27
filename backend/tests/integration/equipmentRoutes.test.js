const request = require('supertest');
const express = require('express');
const { equipmentrRoutes }  = require('../../src/routes');
const equipmentService = require('../../src/services/equipment.service');

// Mock the service layer
jest.mock('../../src/services/equipment.service', () => ({
  equipmentService: jest.fn(),
}));

// Create an Express app for testing
const app = express();
app.use(express.json());
app.use('/', equipmentrRoutes);

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('GET /users should return a list of users', async () => {
    // Mock the service response
    equipmentService.getAveragesValues.mockResolvedValue([
      { id: 1,
      equipmentId: 'EQ-123451016',
          timestamp: '2023-02-15T01:30:00.000-05:00',
          value: 100
       },
    ]);

    const response = await request(app).get('/equipments');

    // Assertions
    expect(response.status).toBe(200);
    // expect(response.body).toEqual([
    //   { id: 1, name: 'John Doe', email: 'john@example.com' },
    //   { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    // ]);
    expect(equipmentService.getAveragesValues).toHaveBeenCalledTimes(1);
  });

  // it('GET /users should return 500 on service error', async () => {
  //   // Mock a service error
  //   equipmentService.getUsers.mockRejectedValue(new Error('Service Error'));

  //   const response = await request(app).get('/users');

  //   // Assertions
  //   expect(response.status).toBe(500);
  //   expect(response.body).toHaveProperty('error', 'Service Error');
  //   expect(equipmentService.getUsers).toHaveBeenCalledTimes(1);
  // });
});
