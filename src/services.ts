const axios = require('axios').default;
import StatsAPIError from "./utilities";

const fetchNHLEndpoint = async (endpoint: string) => {
    const baseUrl = "https://statsapi.web.nhl.com/api/v1";
    try {
        const url = `${baseUrl}/${endpoint}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new StatsAPIError('Data did not return correctly from the NHL API');
    }
}

export const fetchTeams = async (id: string) => {
    return await fetchNHLEndpoint(`teams/${id}`);
}

export const fetchStandings = async (seasonId: string) => {
    return await fetchNHLEndpoint(`standings?season=${seasonId}`);  
}

export const fetchSchedule = async (id: string, seasonId: string) => {
    return await fetchNHLEndpoint(`schedule?teamId=${id}&season=${seasonId}&gameType=R`);     
}

export const fetchPeople = async (id: string) => {
    return await fetchNHLEndpoint(`people/${id}`);     
}

export const fetchPeopleStats = async (id: string, seasonId: string) => {
    return await fetchNHLEndpoint(`people/${id}/stats?stats=statsSingleSeason&season=${seasonId}`);     
}

export default fetchNHLEndpoint;
