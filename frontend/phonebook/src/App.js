import React, {useState, useEffect} from "react"
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import personService from './services/persons.js'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("") // We need a name change handler.
  const [newNumber, setNewNumber] = useState("") // We need a name change handler.
  const [filterName, setNewFilterName] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessageCSS, setErrorMessageCSS] = useState('success')


  useEffect(() => {
    personService
      .getAll()
      .then(initalPhonebook => {
        setPersons(initalPhonebook)
      })
  }, []) //run at start


  const deletePerson = (id, name) => {
    console.log(`called delete person ${id} ${name}`)
    personService
      .deletePerson(id)
      .then(() => {
        console.log(`delete worked`)
        setErrorMessage(`Person ${name} deleted`)
        //promise successful, don't care about returned stuff?
        setPersons(persons.filter(n=>n.id !== id))
      })
      .catch(error => {
        setErrorMessageCSS('error')
        setErrorMessage(`Person ${name} unable to be deleted, please refresh the page.`)
        setPersons(persons.filter(n=>n.id !== id))

      }

      )
  }


return (<div>
  <h2>Phonebook</h2>
  <Notification message={errorMessage} cssClass={errorMessageCSS} setErrorMessage={setErrorMessage} />
  <Filter filterName={filterName} setNewFilterName={setNewFilterName}/>
  <h2>Add a new</h2>
  <PersonForm
    persons={persons}
    setPersons={setPersons}
    newName={newName}
    setNewName={setNewName}
    newNumber={newNumber}
    setNewNumber={setNewNumber}
    setErrorMessage={setErrorMessage}
    setErrorMessageCSS={setErrorMessageCSS}
    />
  <h2>Numbers</h2>
  <Persons persons={persons} deletePerson={deletePerson} filterName={filterName}/>


</div>)
}

export default App;
