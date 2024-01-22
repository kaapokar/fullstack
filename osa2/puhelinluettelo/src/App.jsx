import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification  from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
      })
  }, [])

  
  const addName = (event) => {
    event.preventDefault()

    const isPerson = persons.find((person) => person.name === newName)

    if (isPerson) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        const updatedPerson = { ...isPerson, number: newNumber };
        personService
          .update(isPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id !== isPerson.id ? person : returnedPerson)))
            setNewName('')
            setNewNumber('')
            setMessage(
              `${updatedPerson.name} was successfully updated`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            console.log(error)
            setPersons(persons.filter(person => person.id !== updatedPerson.id))
            setNewName('')
            setNewNumber('')
            setMessage(
              `Information of ${updatedPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        important: Math.random() > 0.5,
        id: persons.length + 1,
    }
      personService
        .create(nameObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(
          `${newName} was successfully added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(
          `[ERROR] ${error.response.data.error}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        console.log(error.response.data)
      })
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personService
        .remove(id)
      setMessage(
        `${personToDelete.name} was successfully deleted`
      )
      setPersons(persons.filter((person) => person.id !== id))
      setTimeout(() => {
        setMessage(null)
      }, 5000)    
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} onSearchChange={handleSearchChange} />

      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        NameChange={handleNameChange}
        NumberChange={handleNumberChange}
        onSubmit={addName}
      />

      <h3>Numbers</h3>
      <Persons persons={filtered} onDelete={deletePerson}/>

    </div>
  )

}

export default App