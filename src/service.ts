const axios = require('axios').default;

export const fetchNHLEndpoint = async () => {
    const baseUrl = "https://statsapi.web.nhl.com/api/v1/teams";
    try {
      const { data } = await axios.get(baseUrl);
      console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(`Axios error: ${error}`);
      } else {
        console.log(`Unknown error: ${error}`);
      }
    }
}
