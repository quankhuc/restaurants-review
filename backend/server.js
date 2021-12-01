import express from 'express'
import cors from 'cors'
import restaurants from './api/restaurants.route.js'

const app = express()
app.use(cors())
// enable json parser so that front end can request/send data
app.use(express.json())
app.use('/api/restaurants', restaurants)
// if they request for a different route, return 404 with error message
app.use('*', (req, res) => {
  res.status(404).json({error: '404 Not Found'})
})

export default app