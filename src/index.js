import express from 'express'
import { v4 as uuid } from 'uuid'
import morgan from 'morgan'
import dotenv from 'dotenv'
import Sequelize from 'sequelize'

// configuration --------------
dotenv.config()
const dbLocation = process.env.DB_LOCATION

// database -------------------
let options = { dialect: 'sqlite', storage: dbLocation }
if (process.env.ENVIRONMENT === 'production')
options = {...options, logging: false}
const sequelize = new Sequelize(options)

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err))

const Contact = sequelize.define('contacts', {
    id: { primaryKey: true, type: Sequelize.TEXT },
    firstName: { type: Sequelize.TEXT },
    lastName: { type: Sequelize.STRING },
    phoneNumber: { type: Sequelize.STRING }
})

sequelize.sync().then(() => console.log(`Database & tables created!`))


// api ------------------------
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

app.post('/contacts', (req, res) => {
    let contact = req.body

    if (contact == null) {
        res.sendStatus(400)
        return
    }

    contact.id = uuid()

    Contact.create(contact).then(contact => {
        //todo: 
        //res.setHeader('Location',`${req.path}/${contact.Id}`)
        res.setHeader('Location', `/${contact.id}`)
        res.sendStatus(201)
    })
})

app.get('/contacts', async (req, res) => {
    const contacts = await Contact.findAll()
    res.json(contacts)
})

app.get('/contacts/:id', async (req, res) => {
    const contact = await Contact.findByPk(req.params.id)
    if (contact === null) {
        res.sendStatus(404)
        return
    }

    res.json(contact)
})

app.put('/contacts/:id', async (req, res) => {
    let payload = req.body
    if (payload == null) {
        res.sendStatus(400)
        return
    }

    const contact = await Contact.findByPk(req.params.id)
    if (contact === null) {
        res.sendStatus(404)
        return
    }

    await contact.update({
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber
    })

    res.sendStatus(204)
})

app.delete('/contacts/:id', async (req, res) => {
    const contact = await Contact.findByPk(req.params.id)
    if (contact === null) {
        res.sendStatus(404)
        return
    }
    await contact.destroy()
    res.sendStatus(204)
})

app.listen(8010, () => console.log(`server started on ${process.env.ENVIRONMENT}`))