NHL ETL Pipeline

This is a Node/Express RESTful application written in Typescript. I built the application on Node v14.17.5; if you use nvm, there is an .nvmrc and you can pull in the target Node version wiht `nvm use`. It is untested with other Node versions but it will probably work well with any relatively modern Node version.

`npm install` to pull in dependencies once you have the correct Node version.

The package.json gives an overview of available commands.

`npm run start` will run the service in production mode, with no hot reloading and fewer client-facing error messages.
`npm run start:dev` will run the service in development mode, with hot reloading and more error messages dumped to the user.

Both services run on port 8000.

There are Jest/Supertest unit tests and integration tests; these can be run with `npm run test:unit` and `npm run test:integration`. Each suite can be run in watch mode by appending `:watch`, as in `test:unit:watch`.

There are two endpoints. Each endpoint takes two parameters: :seasonID of the form YYYYYYYY, as in `20212022` for the current season. I don't think that this is the most fantastic way in the world to accept seasonIds but I wanted to be consistent with the nhl statsapis that support this project. The endpoints also take an :id, representing a team or player.

`/players/:seasonId/:id` will download a csv file with information about the requested player in the requested season. The listed parameters are also the headers in the csv file:
   { 
    id,
    name,
    currentTeamName,
    age,
    rosterNumber,
    position,
    isRookie,
    assists,
    goals,
    games,
    points,
    hits
   }
If the player exists in the player pool but did not have stats for the requested seasonId, the season stat totals (assists, goals, games, points, hits) will be rendered as 0 in the csv file.

`/teams/:seasonId/:id` will download a csv file with information about the requested team in the requested season. The listed parameters are also the headers in the csv file:
{
    id,
    name,
    venueName,
    firstGameDate,
    firstGameOppName,
    gamesPlayed,
    wins,
    losses,
    points,
    goalsPerGame,
}

I enjoyed working on this project and I look forward to discussing it with the team.

