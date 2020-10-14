import React from 'react'
import Name from './Name.js'

const NameList = ({filterPersons, deletePerson}) => {

  const deletePersonConfirm = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)){
      deletePerson(id, name)
    }
  }

  if (filterPersons.length > 0) {
    return (filterPersons.map(person =>
      <Name
        key={person.name}
        deleteNamedPerson={() => deletePersonConfirm(person.id, person.name)}
        name={person}/>))
  } else {
    return (<div>No people found</div>)
  }
}

export default NameList;
