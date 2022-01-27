const axios = require('axios').default;

const fetchNHLEndpoint = async (endpoint: string) => {
    const baseUrl = "https://statsapi.web.nhl.com/api/v1";
    try {
        const url = `${baseUrl}/${endpoint}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return false;
    }
}

export default fetchNHLEndpoint;
