import express, {ErrorRequestHandler} from 'express';
import { fetchTeams, fetchSchedule, fetchStandings } from './services';
import teamConstructor from './constructors';
import { filenameGenerator } from './utilities';
import generateAndServeCSV from './csv';
const app = express();

app.get('/teams/:seasonId/:id', async (req, res, next) => {
  const {id, seasonId } = req.params;
  const teamsAPICalls = [
    fetchTeams(id),
    // fetchSchedule(id, seasonId),
    // fetchStandings(seasonId)
  ];
  await Promise.all(teamsAPICalls).then( values => {
    generateAndServeCSV(teamConstructor(values), res, filenameGenerator(id, seasonId));
    /* this would be a good spot for in-memory key value caching with something 
      like https://github.com/jaredwray/keyv if this is running on a server,
      or write to a datastore if it is serverless.
      Lowest hanging fruit is to cache all previous season results since they won't ever change
      so we don't need a cache expiration strategy :)
    */
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