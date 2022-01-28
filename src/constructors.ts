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

export const findTeamInStandings = (records: any, id: number) => {
    try {
        type standingsTeam = {
            leagueRecord: {
                wins: number,
                losses: number,
            },
            points: number,
            goalsScored: number,
            gamesPlayed: number
        };

        let result :standingsTeam | undefined; 
        records.some((divisionRecord :any) => {
            return divisionRecord.teamRecords.some((team :any) => {
                if (team.team.id === id) {
                    result = team;
                    return true;
                }
            })
        })
        return result;
    } catch (error) {
        throw new DataParseError('Failure parsing api data');
    }
}

/* construct team object from api calls */
const teamConstructor = (teamsAPIData :any) :Team => {
    try {
        const rawTeam = teamsAPIData[0].teams[0];
        const firstSeasonGame = teamsAPIData[1].dates[0];
        const standingsTeam = findTeamInStandings(teamsAPIData[2].records, rawTeam.id);
        if (standingsTeam === null) {
            throw new DataParseError('Failure parsing api data');
        } else {
            const ret :Team= {
                id: rawTeam.id, 
                name: rawTeam.name,
                venueName: rawTeam.venue.name,
                firstGameDate: firstSeasonGame.date,
                firstGameOppName: findGameOppName(firstSeasonGame.games[0], rawTeam.id),
                wins: standingsTeam!.leagueRecord.wins,
                losses: standingsTeam!.leagueRecord.losses,
                points: standingsTeam!.points,
                gamesPlayed: standingsTeam!.gamesPlayed,
                goalsPerGame: standingsTeam!.goalsScored / standingsTeam!.gamesPlayed
            }
            return ret;
        }
    } catch (error) {
        throw new DataParseError('Failure parsing api data');
    }
}

export default teamConstructor;