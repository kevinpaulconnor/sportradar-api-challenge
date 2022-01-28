import teamConstructor, { findGameOppName } from '../../src/constructors';
import { DataParseError } from '../../src/utilities';

describe('teamConstructor', () => {
    it('throws DataParseError on malformed object', async () => {
        expect(() => teamConstructor({badObject: 'blah'})).toThrow(DataParseError)
    }); 
});

describe('findGameOppName', () => {
    it('throws DataParseError on malformed object', async () => {
        expect(() => findGameOppName({badObject: 'blah'}, 3)).toThrow(DataParseError)
    });
    it('finds correct home/away team names', async () => {
        const game = {
            "gamePk": 2018020020,
            "link": "/api/v1/game/2018020020/feed/live",
            "gameType": "R",
            "season": "20182019",
            "gameDate": "2018-10-06T17:00:00Z",
            "status": {
                "abstractGameState": "Final",
                "codedGameState": "7",
                "detailedState": "Final",
                "statusCode": "7",
                "startTimeTBD": false
            },
            "teams": {
                "away": {
                    "leagueRecord": {
                    "wins": 0,
                    "losses": 1,
                    "ot": 0,
                    "type": "league"
                    },
                    "score": 2,
                    "team": {
                    "id": 22,
                    "name": "Edmonton Oilers",
                    "link": "/api/v1/teams/22"
                    }
                },
                "home": {
                    "leagueRecord": {
                    "wins": 1,
                    "losses": 0,
                    "ot": 0,
                    "type": "league"
                    },
                    "score": 5,
                    "team": {
                    "id": 1,
                    "name": "New Jersey Devils",
                    "link": "/api/v1/teams/1"
                    }
                }
            }
        }
        expect(findGameOppName(game, 22)).toEqual("New Jersey Devils");
        expect(findGameOppName(game, 1)).toEqual("Edmonton Oilers");
    }); 
});