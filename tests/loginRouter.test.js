const request = require('supertest')
const app = require('../app')

describe('Login endpoint', () => {
    test('Should log the user in', done => {
      request(app)
        .post('/api/login')
        .send({
            'username': 'testuser',
            'password': 'test'
        })
        .then(response => {
          expect(response.statusCode).toBe(200)
          done()
        });
    });
  });