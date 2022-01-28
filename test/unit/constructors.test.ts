import teamConstructor, { playerConstructor, getAge, findGameOppName, findTeamInStandings } from '../../src/constructors';
import { DataParseError } from '../../src/utilities';

describe('teamConstructor', () => {
    it('throws DataParseError on malformed object', async () => {
        expect(() => teamConstructor({badObject: 'blah'})).toThrow(DataParseError)
    }); 
});

describe('playerConstructor', () => {
    it('throws DataParseError on malformed object', async () => {
        expect(() => playerConstructor({badObject: 'blah'})).toThrow(DataParseError)
    }); 
});

describe('getAge', () => {
    const today = new Date("2022-1-27");
    it('gives right age on birthday', async () => {
        expect(getAge("1992-1-27", today)).toBe(30);
    });
    it('gives right age birthday yesterday', async () => {
        expect(getAge("1992-1-26", today)).toBe(30);
    });
    it('gives right age birthday tomorrow', async () => {
        expect(getAge("1992-1-28", today)).toBe(29);
    });
    it('gives right age birthday leap year', async () => {
        expect(getAge("2020-2-29", today)).toBe(1);
    });
    it('gives right age birthday late in year', async () => {
        expect(getAge("2000-11-28", today)).toBe(21);
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

describe('findTeamInStandings', () => {
    it('throws DataParseError on malformed object', async () => {
        expect(() => findGameOppName({badObject: 'blah'}, 3)).toThrow(DataParseError)
    });
    it('finds correct teams from standings api', async () => {
        const records = [
            {
                "standingsType": "regularSeason",
                "league": {
                    "id": 133,
                    "name": "National Hockey League",
                    "link": "/api/v1/league/133"
                },
                "division": {
                    "id": 1,
                    "name": "Atlantic",
                    "link": "/api/v1/divisions/1"
                },
                "conference": {
                    "id": 1,
                    "name": "Eastern",
                    "link": "/api/v1/conferences/1"
                },
                "season": "20002001",
                "teamRecords": [
                    {
                        "team": {
                            "id": 1,
                            "name": "New Jersey Devils",
                            "link": "/api/v1/teams/1"
                        },
                        "leagueRecord": {
                            "wins": 48,
                            "losses": 19,
                            "ties": 12,
                            "ot": 3,
                            "type": "league"
                        },
                        "goalsAgainst": 195,
                        "goalsScored": 295,
                        "points": 111,
                        "divisionRank": "1",
                        "divisionL10Rank": "1",
                        "divisionRoadRank": "1",
                        "divisionHomeRank": "2",
                        "conferenceRank": "1",
                        "conferenceL10Rank": "1",
                        "conferenceRoadRank": "1",
                        "conferenceHomeRank": "5",
                        "leagueRank": "3",
                        "leagueL10Rank": "2",
                        "leagueRoadRank": "1",
                        "leagueHomeRank": "10",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "wins",
                            "streakNumber": 4,
                            "streakCode": "W4"
                        },
                        "clinchIndicator": "z",
                        "pointsPercentage": 0.676829268292683,
                        "ppDivisionRank": "1",
                        "ppConferenceRank": "1",
                        "ppLeagueRank": "2",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 4,
                            "name": "Philadelphia Flyers",
                            "link": "/api/v1/teams/4"
                        },
                        "leagueRecord": {
                            "wins": 43,
                            "losses": 25,
                            "ties": 11,
                            "ot": 3,
                            "type": "league"
                        },
                        "goalsAgainst": 207,
                        "goalsScored": 240,
                        "points": 100,
                        "divisionRank": "2",
                        "divisionL10Rank": "4",
                        "divisionRoadRank": "3",
                        "divisionHomeRank": "1",
                        "conferenceRank": "4",
                        "conferenceL10Rank": "12",
                        "conferenceRoadRank": "5",
                        "conferenceHomeRank": "2",
                        "leagueRank": "7",
                        "leagueL10Rank": "20",
                        "leagueRoadRank": "8",
                        "leagueHomeRank": "6",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "wins",
                            "streakNumber": 2,
                            "streakCode": "W2"
                        },
                        "clinchIndicator": "x",
                        "pointsPercentage": 0.6097560975609756,
                        "ppDivisionRank": "2",
                        "ppConferenceRank": "3",
                        "ppLeagueRank": "7",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 5,
                            "name": "Pittsburgh Penguins",
                            "link": "/api/v1/teams/5"
                        },
                        "leagueRecord": {
                            "wins": 42,
                            "losses": 28,
                            "ties": 9,
                            "ot": 3,
                            "type": "league"
                        },
                        "goalsAgainst": 256,
                        "goalsScored": 281,
                        "points": 96,
                        "divisionRank": "3",
                        "divisionL10Rank": "2",
                        "divisionRoadRank": "2",
                        "divisionHomeRank": "3",
                        "conferenceRank": "6",
                        "conferenceL10Rank": "5",
                        "conferenceRoadRank": "4",
                        "conferenceHomeRank": "6",
                        "leagueRank": "9",
                        "leagueL10Rank": "6",
                        "leagueRoadRank": "7",
                        "leagueHomeRank": "12",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "wins",
                            "streakNumber": 1,
                            "streakCode": "W1"
                        },
                        "clinchIndicator": "x",
                        "pointsPercentage": 0.5853658536585366,
                        "ppDivisionRank": "3",
                        "ppConferenceRank": "5",
                        "ppLeagueRank": "9",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 3,
                            "name": "New York Rangers",
                            "link": "/api/v1/teams/3"
                        },
                        "leagueRecord": {
                            "wins": 33,
                            "losses": 43,
                            "ties": 5,
                            "ot": 1,
                            "type": "league"
                        },
                        "goalsAgainst": 290,
                        "goalsScored": 250,
                        "points": 72,
                        "divisionRank": "4",
                        "divisionL10Rank": "3",
                        "divisionRoadRank": "4",
                        "divisionHomeRank": "4",
                        "conferenceRank": "10",
                        "conferenceL10Rank": "9",
                        "conferenceRoadRank": "10",
                        "conferenceHomeRank": "11",
                        "leagueRank": "21",
                        "leagueL10Rank": "16",
                        "leagueRoadRank": "22",
                        "leagueHomeRank": "23",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "losses",
                            "streakNumber": 1,
                            "streakCode": "L1"
                        },
                        "pointsPercentage": 0.43902439024390244,
                        "ppDivisionRank": "4",
                        "ppConferenceRank": "10",
                        "ppLeagueRank": "21",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 2,
                            "name": "New York Islanders",
                            "link": "/api/v1/teams/2"
                        },
                        "leagueRecord": {
                            "wins": 21,
                            "losses": 51,
                            "ties": 7,
                            "ot": 3,
                            "type": "league"
                        },
                        "goalsAgainst": 268,
                        "goalsScored": 185,
                        "points": 52,
                        "divisionRank": "5",
                        "divisionL10Rank": "5",
                        "divisionRoadRank": "5",
                        "divisionHomeRank": "5",
                        "conferenceRank": "15",
                        "conferenceL10Rank": "14",
                        "conferenceRoadRank": "14",
                        "conferenceHomeRank": "15",
                        "leagueRank": "30",
                        "leagueL10Rank": "27",
                        "leagueRoadRank": "29",
                        "leagueHomeRank": "30",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "losses",
                            "streakNumber": 3,
                            "streakCode": "L3"
                        },
                        "pointsPercentage": 0.3170731707317073,
                        "ppDivisionRank": "5",
                        "ppConferenceRank": "15",
                        "ppLeagueRank": "30",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    }
                ]
            },
            {
                "standingsType": "regularSeason",
                "league": {
                    "id": 133,
                    "name": "National Hockey League",
                    "link": "/api/v1/league/133"
                },
                "division": {
                    "id": 2,
                    "name": "Northeast",
                    "link": "/api/v1/divisions/2"
                },
                "conference": {
                    "id": 1,
                    "name": "Eastern",
                    "link": "/api/v1/conferences/1"
                },
                "season": "20002001",
                "teamRecords": [
                    {
                        "team": {
                            "id": 9,
                            "name": "Ottawa Senators",
                            "link": "/api/v1/teams/9"
                        },
                        "leagueRecord": {
                            "wins": 48,
                            "losses": 21,
                            "ties": 9,
                            "ot": 4,
                            "type": "league"
                        },
                        "goalsAgainst": 205,
                        "goalsScored": 274,
                        "points": 109,
                        "divisionRank": "1",
                        "divisionL10Rank": "1",
                        "divisionRoadRank": "1",
                        "divisionHomeRank": "1",
                        "conferenceRank": "2",
                        "conferenceL10Rank": "2",
                        "conferenceRoadRank": "2",
                        "conferenceHomeRank": "1",
                        "leagueRank": "4",
                        "leagueL10Rank": "3",
                        "leagueRoadRank": "4",
                        "leagueHomeRank": "3",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "wins",
                            "streakNumber": 2,
                            "streakCode": "W2"
                        },
                        "clinchIndicator": "y",
                        "pointsPercentage": 0.6646341463414634,
                        "ppDivisionRank": "1",
                        "ppConferenceRank": "2",
                        "ppLeagueRank": "4",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 7,
                            "name": "Buffalo Sabres",
                            "link": "/api/v1/teams/7"
                        },
                        "leagueRecord": {
                            "wins": 46,
                            "losses": 30,
                            "ties": 5,
                            "ot": 1,
                            "type": "league"
                        },
                        "goalsAgainst": 184,
                        "goalsScored": 218,
                        "points": 98,
                        "divisionRank": "2",
                        "divisionL10Rank": "3",
                        "divisionRoadRank": "2",
                        "divisionHomeRank": "2",
                        "conferenceRank": "5",
                        "conferenceL10Rank": "6",
                        "conferenceRoadRank": "6",
                        "conferenceHomeRank": "4",
                        "leagueRank": "8",
                        "leagueL10Rank": "10",
                        "leagueRoadRank": "9",
                        "leagueHomeRank": "8",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "losses",
                            "streakNumber": 1,
                            "streakCode": "L1"
                        },
                        "clinchIndicator": "x",
                        "pointsPercentage": 0.5975609756097561,
                        "ppDivisionRank": "2",
                        "ppConferenceRank": "4",
                        "ppLeagueRank": "8",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 10,
                            "name": "Toronto Maple Leafs",
                            "link": "/api/v1/teams/10"
                        },
                        "leagueRecord": {
                            "wins": 37,
                            "losses": 29,
                            "ties": 11,
                            "ot": 5,
                            "type": "league"
                        },
                        "goalsAgainst": 207,
                        "goalsScored": 232,
                        "points": 90,
                        "divisionRank": "3",
                        "divisionL10Rank": "5",
                        "divisionRoadRank": "3",
                        "divisionHomeRank": "4",
                        "conferenceRank": "7",
                        "conferenceL10Rank": "8",
                        "conferenceRoadRank": "7",
                        "conferenceHomeRank": "9",
                        "leagueRank": "14",
                        "leagueL10Rank": "15",
                        "leagueRoadRank": "12",
                        "leagueHomeRank": "18",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "losses",
                            "streakNumber": 1,
                            "streakCode": "L1"
                        },
                        "clinchIndicator": "x",
                        "pointsPercentage": 0.5487804878048781,
                        "ppDivisionRank": "3",
                        "ppConferenceRank": "7",
                        "ppLeagueRank": "14",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 6,
                            "name": "Boston Bruins",
                            "link": "/api/v1/teams/6"
                        },
                        "leagueRecord": {
                            "wins": 36,
                            "losses": 30,
                            "ties": 8,
                            "ot": 8,
                            "type": "league"
                        },
                        "goalsAgainst": 249,
                        "goalsScored": 227,
                        "points": 88,
                        "divisionRank": "4",
                        "divisionL10Rank": "2",
                        "divisionRoadRank": "4",
                        "divisionHomeRank": "3",
                        "conferenceRank": "9",
                        "conferenceL10Rank": "4",
                        "conferenceRoadRank": "9",
                        "conferenceHomeRank": "7",
                        "leagueRank": "18",
                        "leagueL10Rank": "4",
                        "leagueRoadRank": "20",
                        "leagueHomeRank": "14",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "wins",
                            "streakNumber": 1,
                            "streakCode": "W1"
                        },
                        "pointsPercentage": 0.5365853658536586,
                        "ppDivisionRank": "4",
                        "ppConferenceRank": "9",
                        "ppLeagueRank": "18",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 8,
                            "name": "Montréal Canadiens",
                            "link": "/api/v1/teams/8"
                        },
                        "leagueRecord": {
                            "wins": 28,
                            "losses": 40,
                            "ties": 8,
                            "ot": 6,
                            "type": "league"
                        },
                        "goalsAgainst": 232,
                        "goalsScored": 206,
                        "points": 70,
                        "divisionRank": "5",
                        "divisionL10Rank": "4",
                        "divisionRoadRank": "5",
                        "divisionHomeRank": "5",
                        "conferenceRank": "11",
                        "conferenceL10Rank": "7",
                        "conferenceRoadRank": "11",
                        "conferenceHomeRank": "12",
                        "leagueRank": "24",
                        "leagueL10Rank": "12",
                        "leagueRoadRank": "23",
                        "leagueHomeRank": "24",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "losses",
                            "streakNumber": 1,
                            "streakCode": "L1"
                        },
                        "pointsPercentage": 0.4268292682926829,
                        "ppDivisionRank": "5",
                        "ppConferenceRank": "11",
                        "ppLeagueRank": "24",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    }
                ]
            },
            {
                "standingsType": "regularSeason",
                "league": {
                    "id": 133,
                    "name": "National Hockey League",
                    "link": "/api/v1/league/133"
                },
                "division": {
                    "id": 3,
                    "name": "Southeast",
                    "link": "/api/v1/divisions/3"
                },
                "conference": {
                    "id": 1,
                    "name": "Eastern",
                    "link": "/api/v1/conferences/1"
                },
                "season": "20002001",
                "teamRecords": [
                    {
                        "team": {
                            "id": 15,
                            "name": "Washington Capitals",
                            "link": "/api/v1/teams/15"
                        },
                        "leagueRecord": {
                            "wins": 41,
                            "losses": 27,
                            "ties": 10,
                            "ot": 4,
                            "type": "league"
                        },
                        "goalsAgainst": 211,
                        "goalsScored": 233,
                        "points": 96,
                        "divisionRank": "1",
                        "divisionL10Rank": "2",
                        "divisionRoadRank": "1",
                        "divisionHomeRank": "1",
                        "conferenceRank": "3",
                        "conferenceL10Rank": "10",
                        "conferenceRoadRank": "3",
                        "conferenceHomeRank": "3",
                        "leagueRank": "10",
                        "leagueL10Rank": "18",
                        "leagueRoadRank": "13",
                        "leagueHomeRank": "7",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "wins",
                            "streakNumber": 1,
                            "streakCode": "W1"
                        },
                        "clinchIndicator": "y",
                        "pointsPercentage": 0.5853658536585366,
                        "ppDivisionRank": "1",
                        "ppConferenceRank": "6",
                        "ppLeagueRank": "10",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 12,
                            "name": "Carolina Hurricanes",
                            "link": "/api/v1/teams/12"
                        },
                        "leagueRecord": {
                            "wins": 38,
                            "losses": 32,
                            "ties": 9,
                            "ot": 3,
                            "type": "league"
                        },
                        "goalsAgainst": 225,
                        "goalsScored": 212,
                        "points": 88,
                        "divisionRank": "2",
                        "divisionL10Rank": "1",
                        "divisionRoadRank": "2",
                        "divisionHomeRank": "2",
                        "conferenceRank": "8",
                        "conferenceL10Rank": "3",
                        "conferenceRoadRank": "8",
                        "conferenceHomeRank": "8",
                        "leagueRank": "17",
                        "leagueL10Rank": "13",
                        "leagueRoadRank": "16",
                        "leagueHomeRank": "15",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "losses",
                            "streakNumber": 1,
                            "streakCode": "L1"
                        },
                        "clinchIndicator": "x",
                        "pointsPercentage": 0.5365853658536586,
                        "ppDivisionRank": "2",
                        "ppConferenceRank": "8",
                        "ppLeagueRank": "17",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 13,
                            "name": "Florida Panthers",
                            "link": "/api/v1/teams/13"
                        },
                        "leagueRecord": {
                            "wins": 22,
                            "losses": 38,
                            "ties": 13,
                            "ot": 9,
                            "type": "league"
                        },
                        "goalsAgainst": 246,
                        "goalsScored": 200,
                        "points": 66,
                        "divisionRank": "3",
                        "divisionL10Rank": "3",
                        "divisionRoadRank": "4",
                        "divisionHomeRank": "4",
                        "conferenceRank": "12",
                        "conferenceL10Rank": "11",
                        "conferenceRoadRank": "13",
                        "conferenceHomeRank": "13",
                        "leagueRank": "27",
                        "leagueL10Rank": "19",
                        "leagueRoadRank": "25",
                        "leagueHomeRank": "27",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "wins",
                            "streakNumber": 1,
                            "streakCode": "W1"
                        },
                        "pointsPercentage": 0.4024390243902439,
                        "ppDivisionRank": "3",
                        "ppConferenceRank": "12",
                        "ppLeagueRank": "27",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 11,
                            "name": "Atlanta Thrashers",
                            "link": "/api/v1/teams/11"
                        },
                        "leagueRecord": {
                            "wins": 23,
                            "losses": 45,
                            "ties": 12,
                            "ot": 2,
                            "type": "league"
                        },
                        "goalsAgainst": 289,
                        "goalsScored": 211,
                        "points": 60,
                        "divisionRank": "4",
                        "divisionL10Rank": "4",
                        "divisionRoadRank": "3",
                        "divisionHomeRank": "5",
                        "conferenceRank": "13",
                        "conferenceL10Rank": "13",
                        "conferenceRoadRank": "12",
                        "conferenceHomeRank": "14",
                        "leagueRank": "28",
                        "leagueL10Rank": "26",
                        "leagueRoadRank": "24",
                        "leagueHomeRank": "29",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "losses",
                            "streakNumber": 2,
                            "streakCode": "L2"
                        },
                        "pointsPercentage": 0.36585365853658536,
                        "ppDivisionRank": "4",
                        "ppConferenceRank": "13",
                        "ppLeagueRank": "28",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    },
                    {
                        "team": {
                            "id": 14,
                            "name": "Tampa Bay Lightning",
                            "link": "/api/v1/teams/14"
                        },
                        "leagueRecord": {
                            "wins": 24,
                            "losses": 47,
                            "ties": 6,
                            "ot": 5,
                            "type": "league"
                        },
                        "goalsAgainst": 280,
                        "goalsScored": 201,
                        "points": 59,
                        "divisionRank": "5",
                        "divisionL10Rank": "5",
                        "divisionRoadRank": "5",
                        "divisionHomeRank": "3",
                        "conferenceRank": "14",
                        "conferenceL10Rank": "15",
                        "conferenceRoadRank": "15",
                        "conferenceHomeRank": "10",
                        "leagueRank": "29",
                        "leagueL10Rank": "28",
                        "leagueRoadRank": "30",
                        "leagueHomeRank": "21",
                        "wildCardRank": "0",
                        "gamesPlayed": 82,
                        "streak": {
                            "streakType": "losses",
                            "streakNumber": 1,
                            "streakCode": "L1"
                        },
                        "pointsPercentage": 0.3597560975609756,
                        "ppDivision Rank": "5",
                        "ppConferenceRank": "14",
                        "ppLeagueRank": "29",
                        "lastUpdated": "2022-01-27T01:41:47Z"
                    }
                ]
            },
        ];
        expect(findTeamInStandings(records, 4)).toEqual({
            "team": {
                "id": 4,
                "name": "Philadelphia Flyers",
                "link": "/api/v1/teams/4"
            },
            "leagueRecord": {
                "wins": 43,
                "losses": 25,
                "ties": 11,
                "ot": 3,
                "type": "league"
            },
            "goalsAgainst": 207,
            "goalsScored": 240,
            "points": 100,
            "divisionRank": "2",
            "divisionL10Rank": "4",
            "divisionRoadRank": "3",
            "divisionHomeRank": "1",
            "conferenceRank": "4",
            "conferenceL10Rank": "12",
            "conferenceRoadRank": "5",
            "conferenceHomeRank": "2",
            "leagueRank": "7",
            "leagueL10Rank": "20",
            "leagueRoadRank": "8",
            "leagueHomeRank": "6",
            "wildCardRank": "0",
            "gamesPlayed": 82,
            "streak": {
                "streakType": "wins",
                "streakNumber": 2,
                "streakCode": "W2"
            },
            "clinchIndicator": "x",
            "pointsPercentage": 0.6097560975609756,
            "ppDivisionRank": "2",
            "ppConferenceRank": "3",
            "ppLeagueRank": "7",
            "lastUpdated": "2022-01-27T01:41:47Z"
        });
        expect(findTeamInStandings(records, 11)).toEqual(                    {
            "team": {
                "id": 11,
                "name": "Atlanta Thrashers",
                "link": "/api/v1/teams/11"
            },
            "leagueRecord": {
                "wins": 23,
                "losses": 45,
                "ties": 12,
                "ot": 2,
                "type": "league"
            },
            "goalsAgainst": 289,
            "goalsScored": 211,
            "points": 60,
            "divisionRank": "4",
            "divisionL10Rank": "4",
            "divisionRoadRank": "3",
            "divisionHomeRank": "5",
            "conferenceRank": "13",
            "conferenceL10Rank": "13",
            "conferenceRoadRank": "12",
            "conferenceHomeRank": "14",
            "leagueRank": "28",
            "leagueL10Rank": "26",
            "leagueRoadRank": "24",
            "leagueHomeRank": "29",
            "wildCardRank": "0",
            "gamesPlayed": 82,
            "streak": {
                "streakType": "losses",
                "streakNumber": 2,
                "streakCode": "L2"
            },
            "pointsPercentage": 0.36585365853658536,
            "ppDivisionRank": "4",
            "ppConferenceRank": "13",
            "ppLeagueRank": "28",
            "lastUpdated": "2022-01-27T01:41:47Z"
        });
    }); 
});