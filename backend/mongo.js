const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nameInput = process.argv[3]
const numberInput = process.argv[4]

const url =
<<<<<<< HEAD
  'mongodb+srv://Kaapokar:<password>@kaapokar.qllncxb.mongodb.net/personApp?retryWrites=true&w=majority'
=======
  `mongodb+srv://Kaapokar:<password>@kaapokar.qllncxb.mongodb.net/personApp?retryWrites=true&w=majority`
>>>>>>> 440088a6ee14a0f07a2e9d9da6ec58b3cddf09aa

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: nameInput,
  number: numberInput
})

if ((nameInput !== undefined) && (numberInput !== undefined)) {
  person.save().then(result => {
    console.log(`added ${nameInput} number ${numberInput} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
<<<<<<< HEAD
    mongoose.connection.close()
  })
}
=======
}
>>>>>>> 440088a6ee14a0f07a2e9d9da6ec58b3cddf09aa
