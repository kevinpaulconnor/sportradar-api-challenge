import axios from 'axios';
import fetchNHLEndpoint from '../../src/services';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchNHLEndpoint', () => {
    it('fetches from correct baseUrl', async () => {
        fetchNHLEndpoint('blah');
        expect(mockedAxios.get).toHaveBeenCalledWith('https://statsapi.web.nhl.com/api/v1/blah');
    });
    it('returns data.data to caller', async () => {
        mockedAxios.get.mockResolvedValue({
            copyright: 'yo all this belongs to the nhl',
            data: 'some data',
        })
        const data = await fetchNHLEndpoint('blah');
        expect(data).toBe('some data');
    });
});