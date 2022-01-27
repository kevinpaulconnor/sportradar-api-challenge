import express from 'express'
import fetchNHLEndpoint from './services'
const app = express()

app.get('/', async (req, res) => {
  const data = await fetchNHLEndpoint('teams');
  console.log(data);
  res.json ({
    success: 'get call succeeded',
    data: data,

  })
})

app.listen(8000, () => {
  console.log('The application is listening on port 8000...')
})