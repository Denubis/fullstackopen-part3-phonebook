import React from 'react'


// setErrorMessage(`the note '${note.content}' was already deleted from the server`)
// setTimeout(()=>{
//   setErrorMessage(null)
// }, 5000)


const Notification = ({message, cssClass, setErrorMessage}) => {
  if (message === null || message === '') {
    return null
  } else {
    setTimeout(()=>{
        setErrorMessage(null)
      },5000
    )
  }

  return (

    <div className={cssClass}>
      {message}
    </div>
  )
}

export default Notification;
