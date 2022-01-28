import request from 'supertest';
import { app } from '../../src/app';

/* These tests and the http api definitely feel a little underbaked.
    I could be considering a wider range of http codes here */

describe('general', () => {
    it('should 404 on nonroute', async () => {
        await request(app).get(`/blah/4`).expect(404);
    });
    it('should 500 on malformed url parameters', async () => {
        // it would be better to have a custom error handler here
        const { body } = await request(app).get(`/players/truck/8476792`)
            .expect(500);
    });
})

describe('GET /players/:seasonId/:id', () => {
    it('should return a player csv without stats', async () => {
        const { body } = await request(app).get(`/players/20002001/8472365`)
            .expect(200)
            .expect('Content-Type', 'text/csv')
            .expect('Content-Length', '149');
    });
    it('should return a player csv with stats', async () => {
        const { body } = await request(app).get(`/players/20202021/8476792`)
            .expect(200)
            .expect('Content-Type', 'text/csv')
            .expect('Content-Length', '158');
    });
    it('should return what it can for future season requests', async () => {
        const { body } = await request(app).get(`/players/20242025/8476792`)
        .expect(200)
        .expect('Content-Type', 'text/csv')
        .expect('Content-Length', '158');
    });
});

describe('GET /teams/:seasonId/:id', () => {
    it('should return a team csv without stats', async () => {
    const { body } = await request(app).get(`/teams/20002001/5`)
        .expect(200)
        .expect('Content-Type', 'text/csv')
        .expect('Content-Length', '192');
    });
    it('should return 500 for future season requests', async () => {
        const { body } = await request(app).get(`/teams/20242025/5`)
        .expect(500);
    });
});