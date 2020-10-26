console.log('Server running');

const express = require('express')
const generate = require('shortid').generate

const app = express()
app.use(express.json())

const PORT = 5000

let users = [
    { id: generate(), name: 'Clay', bio: '19 years old. Nebraska' },
  ]

app.get('/users', (req, res) => {
    res.status(200).json(users)
  })

app.get('/users/:id', (req, res) => {
    const { id } = req.params

    const user = users.find(user => user.id === id)
    if (!user) {
      res.status(404).json({
        message: `No user with id ${id}`,
      })
    } else {
      res.status(200).json(user)
    }
  })

  app.post('/users', (req, res) => {
    const { name, bio } = req.body
    if (!name || !bio) {
      res.status(400).json({
        errorMessage: 'Please provide name and bio for the user.'
      })
    } else {
      const newUser = { id: generate(), name, bio }
      users.push(newUser)
      res.status(201).json(newUser)
    }
  })

  app.delete('/users/:id', (req, res) => {

    const { id } = req.params
    try {
      if (!users.find(user => user.id === id)) {
        res.status(404).json({ message : 'Not found'})
      } else {
        users = users.filter(user => user.id !== id)
        res.status(200).json({ message: `User with id ${id} deleted!`})
      }

    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' })
    }
  })

  app.put('/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    const indexOfUser = users.findIndex(user => user.id === id)
    if (indexOfUser !== -1) {
      users[indexOfUser] = { id, name, bio }
      res.status(200).json({ id, name, bio })
    } else {
      res.status(404).json({
        message: `No user with id ${id}`,
      })
    }
  })
  
  app.all('*', (req, res) => {
    res.status(404).json({ message: 'Not found!' })
  })
  
  // LISTEN FOR INCOMING REQUESTS
  app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
  })

