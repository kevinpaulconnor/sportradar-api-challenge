import express from 'express'
import { fetchNHLEndpoint } from './service'
const app = express()

app.get('/', (req, res) => {
  fetchNHLEndpoint();
})

app.listen(8000, () => {
  console.log('The application is listening on port 8000...')
})