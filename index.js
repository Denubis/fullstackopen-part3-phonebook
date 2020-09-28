const express = require('express')
const app = express()
const PORT = 3001


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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
