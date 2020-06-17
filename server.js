import express from 'express'
import path from 'path'
import {
  getAllExotics, getExoticByName, getExoticsByType, saveNewExotic, patchExotic, deleteExotic
} from './controllers/exotics'
import {
  getAllHunters, getHunterByTag, getHuntersBySubclass, saveNewHunter, patchHunter, deleteHunter
} from './controllers/hunters'

const app = express()

app.use(express.static('public'))

app.set('view engine', 'pug')

app.get('/', (request, response) => {
  response.redirect('/documentation')
})

app.get('/hunters', getAllHunters)

app.get('/hunters/:tag', getHunterByTag)

app.get('/hunters/class/:subclass', getHuntersBySubclass)

app.post('/hunters', express.json(), saveNewHunter)

app.patch('/hunters/:tag', express.json(), patchHunter)

app.delete('/hunters/:tag', deleteHunter)

app.get('/exotics', getAllExotics)

app.get('/exotics/:name', getExoticByName)

app.get('/exotics/:type', getExoticsByType)

app.post('/exotics', express.json(), saveNewExotic)

app.delete('/exotics/:name', deleteExotic)

app.patch('/exotics/:name', express.json(), patchExotic)

app.get('/documentation', (request, response) => {
  response.render('index')
})

app.all('*', (request, response) => response.sendFile(path.resolve(__dirname, 'public', 'index.html')))

app.listen(1221, () => {
  console.log('Listening on port 1221...') // eslint-disable-line no-console
})
