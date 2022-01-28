import { Team } from "./types";
import { DataParseError } from "./utilities";

/* construct team object from api calls */
const teamConstructor = (teamsAPIData :any) :Team => {
    try {
        const rawTeam = teamsAPIData[0].teams[0];
        const ret :Team= {
            id: rawTeam.id,
            name: rawTeam.name,
            venueName: rawTeam.venue.name
        }
        return ret;
    } catch (error) {
        throw new DataParseError('Failure parsing api data');
    }
}

export default teamConstructor;