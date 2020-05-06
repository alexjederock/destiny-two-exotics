const express = require('express')
const app = express()


app.use(express.static('public'))
app.set('view engine', 'pug')
app.get('/hunters', (request, response) =>
{
  response.render('index')
})

app.all('*', (request, response) =>
{
  response.sendStatus(404)
})

app.listen(1221, () =>
{
  console.log('Listening on port 1221...') // eslint-disable-line no-console
})
