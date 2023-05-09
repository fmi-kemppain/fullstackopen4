const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWQiOiI2NDUxMWY5ZmU3MmNlYzc4NTI4YjQxNTUiLCJpYXQiOjE2ODMyMDUxNzh9.r_B4w_2LE77RG7bOB5GKZJcEe5wFRtUYmrlAWnfH6fU'
const request = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({ })
})

describe('Blogs endpoint', () => {
    test('Should return blogs', done => {
        request(app)
            .get('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .then(response => {
                expect(response.statusCode).toBe(200)
                done()
            });
    });

    test('Should create a blog', done => {
        request(app)
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "title": "postman good",
                "author": "64511f9fe72cec78528b4155"
            })
            .then(response => {
                expect(response.statusCode).toBe(201)
                done()
            });
    });

    test('Should edit a blog', done => {
        request(app)
            .put('/api/blogs/64511f9fe72cec78528b4155')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "title": "postman good",
                "likes": 1
            })
            .then(response => {
                expect(response.statusCode).toBe(201)
                done()
            });
    });
});