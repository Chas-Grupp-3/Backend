const request = require('supertest');
const express = require('express');

const app = express();
app.get('/test', (req, res) => res.json({ status: 'ok' }));

describe('test endpoint', () => {
    it('should return status ok', async () => {
        const res = await request(app).get('/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('ok');
    });
});