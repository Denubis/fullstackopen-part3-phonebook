const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
var morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 3001



app.use(cors())
// invoking this middlware before making morgan tokens shouldn't matter, but...
app.use(express.static('build'))


app.use(express.json()) //Well rememering this took me 2 bloody hours.


morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) //middleware executes in order




let persons = [
    {
      "name": "Arto a Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]


app.get('/info', (request, response) => {
  const dateString = new Date().toString()
  // I'm really not going to bother expanding the TZ name
  response.send(`<div>Phonebook has info for ${persons.length} people</div>
                 <br/>
                 <div>${dateString}</div>
    `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})


// Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5
//
// If an entry for the given id is not found, the server has to respond with the appropriate status code.
//

app.get('/api/persons/:id', (request, response)=> {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.post('/api/persons', (request, response)=>{
  //generate ID with Math.random? No. Going to use uuids instead. No point in doing this with known security issues.

  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'no name',
      content: body
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'no number',
      content: body
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name already exists',
      content: body,
      existing: persons.find(person => person.name === body.name)
    })
  }

  console.log(body)
  const person = {
    name: body.name,
    number: body.number,
    id: uuidv4()
  }

  persons = persons.concat(person)

  response.json(person)
})


app.delete('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
