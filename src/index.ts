import express, {ErrorRequestHandler} from 'express';
import { fetchTeams, fetchSchedule, fetchStandings, fetchPeople, fetchPeopleStats } from './services';
import teamConstructor, { playerConstructor } from './constructors';
import { filenameGenerator } from './utilities';
import generateAndServeCSV from './csv';
const app = express();

app.get('/teams/:seasonId/:id', async (req, res, next) => {
  const {id, seasonId } = req.params;
  const teamsAPICalls = [
    fetchTeams(id),
    fetchSchedule(id, seasonId),
    fetchStandings(seasonId)
  ];
  await Promise.all(teamsAPICalls).then( values => {
    generateAndServeCSV(teamConstructor(values), res, filenameGenerator(id, seasonId));
    /* this would be a good spot for in-memory key value caching with something 
      like https://github.com/jaredwray/keyv if this is running on a server,
      or write to a datastore if it is serverless. Players route as well -- the code could be
      consolidated for the two routes.
      Lowest hanging fruit is to cache all previous season results since they won't ever change
      so we don't need a cache expiration strategy :)
    */
  }).catch(error => next(error));
})

app.get('/players/:seasonId/:id', async (req, res, next) => {
  const {id, seasonId } = req.params;
  const calls = [
    fetchPeople(id),
    fetchPeopleStats(id, seasonId),
  ];
  await Promise.all(calls).then( values => {
    generateAndServeCSV(playerConstructor(values), res, filenameGenerator(id, seasonId));

  }).catch(error => next(error));
})

app.get('/testplayers/:seasonId/:id', async (req, res, next) => {
  const {id, seasonId } = req.params;
  const calls = [
    //fetchPeople(id),
    fetchPeopleStats(id, seasonId),
  ];
  await Promise.all(calls).then( values => {
    res.json({
      data: values
    })
  }).catch(error => next(error));
})


// const errorHandler: ErrorRequestHandler = function(err, req, res, next) {
//   // If err has no specified error code, set error code to 'Internal Server Error (500)'
//   if (!err.statusCode) {
//       err.statusCode = 500;
//   } 

//   res.status(err.statusCode).json({
//       status: false,
//       error: err.message
//   });

// }
// app.use(errorHandler)

app.listen(8000, () => {
  console.log('The application is listening on port 8000...')
})