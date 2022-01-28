import express, {ErrorRequestHandler} from 'express';
import { fetchTeams, fetchSchedule, fetchStandings } from './services';
import generateCSVBuffer from './csv';
import { respondWithAttachingFile } from './utilities';
const app = express();

app.get('/teams/:seasonId/:id', async (req, res, next) => {
  let data = {};
  const {id, seasonId } = req.params;
  const teamsAPICalls = [
    fetchTeams(id),
    fetchSchedule(id, seasonId),
    fetchStandings(seasonId)
  ];
  await Promise.all(teamsAPICalls).then( values => {
    res.json ({
      success: 'get call succeeded',
      data: teamsAPICalls.length
    })   
  }).catch(error => next(error));
})

app.get('/csv', async (req, res, next) => {
  generateCSVBuffer({
    a: 1,
    b: 2,
    c: 3
  }).then(data => respondWithAttachingFile(data, res, 'test.csv'));
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