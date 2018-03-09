const express = require('express')
const app = express()
const port = process.argv[2] || 8080
const bodyParser = require('body-parser')



const knex = require('knex')({ //establish connection between knex and bookshelf.
    client: 'pg',
    connection: {
        database: 'fullstack_todo',
        user: 'sandrailli',
        password: 'password'
    }
})

const bookshelf = require('bookshelf')(knex) //initializing bookshelf function with knex to talk to database.

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



//CREATE new task
app.post('/tasks', (req, res) => {

    let newTask = new Task({ //adding a new task with a title and done key. these are retrieved from parsed body data.

        title: req.body.title,
        done: req.body.done,
    })
    newTask.save() //save added task to databse table.
        .then((task) => {
            res.json(task.attributes)//attributes comes from the data, check with console.log(req.body). these are the actual task keys that are needed.
        })
})

// READ fetch all tasks upon re-load/refresh
app.get('/', (req, res) => {
    Task.fetchAll()
        .then(self => {
            res.json(self.models.map(task => task.attributes))
        })

})

//UPDATE task upon toggling true/false

app.post('/update', (req, res) => {

    let updatedTask = {
        done: req.body.done,
    }
    console.log(req.body)
    Task.where({ id: req.body.id })
        .save(updatedTask, { patch: true })
        .then((task) => {
            Task.fetchAll()
                .then(self => {
                    res.json(self.models.map(task => task.attributes))
                })
        })
})


//DELETE toggled task upon onClick
app.get('/clear', (req, res) => {
    Task.where({ done: true })
        .destroy()
        .then((task) => {
            Task.fetchAll()
                .then(self => {
                    res.json(self.models.map(task => task.attributes))
                })
        })

})



const Task = bookshelf.Model.extend({ //Schema and model 
    tableName: 'tasks'
})



app.listen(port, () => {
    console.log(`Listening on ${port}`)
})