const axios = require('axios').default;

const fetchNHLEndpoint = async (endpoint: string) => {
    const baseUrl = "https://statsapi.web.nhl.com/api/v1";
    try {
        const url = `${baseUrl}/${endpoint}`;
        const data = await axios.get(url);
        return data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(`Axios error: ${error}`);
        } else {
            console.log(`Unknown error: ${error}`);
        }
    }
}

export default fetchNHLEndpoint;
