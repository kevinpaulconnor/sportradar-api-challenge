import { Team, Player } from "./types";
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

export const getAge = (dateString: string, today = new Date()) => {
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let delta = today.getMonth() - birthDate.getMonth();
    if (delta < 0 || (delta === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/* construct player object from api calls */
export const playerConstructor = (playersAPIData :any) :Player => {
    try {        
        const rawPlayer = playersAPIData[0].people[0];
        let seasonStats;
        const splits = playersAPIData[1].stats.splits;
        if (splits) {
            seasonStats = splits[0].stat;
        }
        const ret :Player = {
            id: rawPlayer.id, 
            name: rawPlayer.fullName,
            currentTeamName: rawPlayer.currentTeam ? rawPlayer.currentTeam.name : "None",
            age: getAge(rawPlayer.birthDate),
            rosterNumber: rawPlayer.primaryNumber,
            position: rawPlayer.primaryPosition.name,
            isRookie: rawPlayer.rookie,
            assists: seasonStats ? seasonStats.assists : 0,
            goals: seasonStats ? seasonStats.goals : 0,
            games: seasonStats ? seasonStats.games : 0,
            hits: seasonStats ? seasonStats.hits : 0,
            points: seasonStats ? seasonStats.points : 0,
        }
        return ret;
    } catch (error) {
        throw new DataParseError('Failure parsing api data');
    }
}

export default teamConstructor;