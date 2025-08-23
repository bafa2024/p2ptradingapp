import request from 'supertest';
import App from '../server';

describe('Server', () => {
  let app: App;

  beforeAll(() => {
    app = new App();
  });

  afterAll(async () => {
    await app.stop();
  });

  describe('Health Check', () => {
    it('should return 200 for health check endpoint', async () => {
      const response = await request(app.app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
    });
  });

  describe('API Documentation', () => {
    it('should return API information', async () => {
      const response = await request(app.app).get('/api');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app.app).get('/non-existent-route');
      expect(response.status).toBe(404);
    });
  });
});
