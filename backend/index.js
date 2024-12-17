const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/inotebook');
const express = require('express');
var cors = require('cors')

const app = express()
const port = 5000
app.use(cors(
  {
    origin : ["https://i-notebook-frontend-xi-blue.vercel.app/login"],
    methods : ["POST", "GET"],
    credentials : true
  }
))
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})
