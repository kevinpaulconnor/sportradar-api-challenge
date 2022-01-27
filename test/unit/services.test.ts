import axios from 'axios';
import fetchNHLEndpoint from '../../src/service';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

it('make api call to get data', () => {
    // call this first
    mockedAxios.get.mockResolvedValue('somevalue');
 
    fetchNHLEndpoint('blah');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://statsapi.web.nhl.com/api/v1/blah');
 })