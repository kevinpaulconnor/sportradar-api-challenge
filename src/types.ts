export type Team = {
    id: number,
    name: string,
    venueName: string,
    firstGameDate: string,
    firstGameOppName: string,
    gamesPlayed: number,
    wins: number,
    losses: number,
    points: number,
    goalsPerGame: number,
}

export type Player = {
    id: number,
    name: string,
    currentTeamName: string,
    age: number,
    rosterNumber: number,
    position: string,
    isRookie: boolean,
    assists: number,
    goals: number,
    games: number,
    points: number,
    hits: number
}