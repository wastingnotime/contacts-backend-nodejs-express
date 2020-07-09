import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const contacts = [{
    'Id': uuidv4(),
    'FirstName': "Albert",
    'LastName': "Einstein",
    'PhoneNumber': "2222-1111"
},
{
    'Id': uuidv4(),
    'FirstName': "Mary",
    'LastName': "Curie",
    'PhoneNumber': "1111-1111"
}]

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

app.post('/contacts', (req, res) => {
    let contact = req.body

    if (contact == null) {
        res.sendStatus(400)
        return
    }
    contact.Id = uuidv4()

    contacts.push(contact)

    //todo: 
    //res.setHeader('Location',`${req.path}/${contact.Id}`)
    res.setHeader('Location', `/${contact.Id}`)
    res.sendStatus(201)
})

app.get('/contacts', (req, res) => {
    res.json(contacts)
})

app.get('/contacts/:id', (req, res) => {
    let id = req.params.id
    let contact = contacts.find(c => c.Id === id)
    if (!contact) {
        res.sendStatus(404)
        return
    }
    res.json(contact)
})

app.put('/contacts/:id', (req, res) => {
    let new_contact = req.body
    if (new_contact == null) {
        res.sendStatus(400)
        return
    }

    let id = req.params.id
    let i = contacts.findIndex(c => c.Id === id)
    if (i === -1) {
        res.sendStatus(404)
        return
    }

    contacts[i] = new_contact

    res.sendStatus(204)
})

app.delete('/contacts/:id', (req, res) => {
    let id = req.params.id
    let i = contacts.findIndex(c => c.Id === id)
    if (i === -1) {
        res.sendStatus(404)
        return
    }
    contacts.splice(i, 1)
    res.sendStatus(204)
})

app.listen(8010, () => console.log(`server started on ${process.env.ENVIRONMENT}`))