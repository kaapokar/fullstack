import React from 'react'

const PersonForm = ({ newName, newNumber, NameChange, NumberChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input 
        value={newName} 
        onChange={NameChange}
        />
      </div>

      <div>
        number: <input 
        value={newNumber} 
        onChange={NumberChange} 
        />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
