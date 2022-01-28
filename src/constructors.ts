import { Team } from "./types";
import { DataParseError } from "./utilities";

export const findGameOppName = (game : any, id: number) => {
    try {
        const awayTeam = game.teams.away.team;
        let ret = '';
        if (awayTeam.id === id) {
            ret = game.teams.home.team.name;
        } else {
            ret = game.teams.away.team.name;
        }
        return ret;
    } catch (error) {
        throw new DataParseError('Failure parsing api data');
    }
}

/* construct team object from api calls */
const teamConstructor = (teamsAPIData :any) :Team => {
    try {
        const rawTeam = teamsAPIData[0].teams[0];
        const firstSeasonGame = teamsAPIData[1].dates[0];
        const ret :Team= {
            id: rawTeam.id,
            name: rawTeam.name,
            venueName: rawTeam.venue.name,
            firstGameDate: firstSeasonGame.date,
            firstGameOppName: findGameOppName(firstSeasonGame.games[0], rawTeam.id)
        }
        return ret;
    } catch (error) {
        throw new DataParseError('Failure parsing api data');
    }
}

export default teamConstructor;