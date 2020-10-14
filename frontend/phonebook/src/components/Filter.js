import React from "react";

const Filter = ({filterName, setNewFilterName}) => {

  const handleFilterChange = (event) => {
    setNewFilterName(event.target.value)
  }


  return (
    <div>
    filter shown with <input value={filterName} onChange={handleFilterChange}/>
    </div>

  )
}


export default Filter
