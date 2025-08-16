const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
app.use(bodyParser.json())
app.use(cors())
const dataPath = path.join(__dirname, 'data', 'characters.json')

// Helper pour lire les personnages
function readCharacters() {
  const data = fs.readFileSync(dataPath, 'utf8')
  return JSON.parse(data).characters
}

// Helper pour écrire les personnages
function writeCharacters(characters) {
  fs.writeFileSync(dataPath, JSON.stringify({ characters }, null, 2))
}

// GET /characters ==> Get all characters
app.get('/characters', (req, res) => {
  const characters = readCharacters()
  res.json(characters)
})

// POST /characters ==> Create a new character
app.post('/characters', (req, res) => {
  const characters = readCharacters()
  const newCharacter = req.body
  // Générer un nouvel id unique
  const maxId = characters.length > 0 ? Math.max(...characters.map(c => c.id)) : 0
  newCharacter.id = maxId + 1
  characters.push(newCharacter)
  writeCharacters(characters)
  res.status(201).json(newCharacter)
})

// GET /characters/:id ==> Get a character by ID
app.get('/characters/:id', (req, res) => {
  const characters = readCharacters()
  const character = characters.find(c => c.id == req.params.id)
  if (!character) return res.status(404).send('Character not found')
  res.json(character)
})

// PUT /characters/:id ==> Update a character by ID
app.put('/characters/:id', (req, res) => {
  const characters = readCharacters()
  const index = characters.findIndex(c => c.id == req.params.id)
  if (index === -1) return res.status(404).send('Character not found')
  characters[index] = { ...characters[index], ...req.body, id: characters[index].id }
  writeCharacters(characters)
  res.json(characters[index])
})

// DELETE /characters/:id ==> Delete a character by ID
app.delete('/characters/:id', (req, res) => {
  let characters = readCharacters()
  const index = characters.findIndex(c => c.id == req.params.id)
  if (index === -1) return res.status(404).send('Character not found')
  const deleted = characters.splice(index, 1)
  writeCharacters(characters)
  res.json(deleted[0])
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})