import React from "react";
import NameList from './NameList.js'


const Persons = ({persons, filterName, deletePerson}) => {


  const filterPersons = filterName
  ? persons.filter((cur) => (cur.name.includes(filterName)))
  : persons


  return (
    <NameList filterPersons={filterPersons} deletePerson={deletePerson}/>

  )
}
export default Persons;
