const express = require('express')
const app = express()
const port = process.argv[2] || 8080
const bodyParser = require('body-parser')



const knex = require('knex')({
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

let tasks = [
    {
        title: '',
        done: false,
    },
    {
        title: '',
        done: false,
    },
]

// app.get('/tasks',(req, res)=>{
//     //return tasks
//     console.log('/')
//     res.send('it lives!')
// })

app.post('/tasks', (req, res) => {
    //save tasks
    console.log(req.body)
    let newTask = new Task({

        title: req.body.title,
        done: req.body.done,
    })
    newTask.save()
        .then((task) => {
            console.log(task)
            res.json(task)
        })
})

//create update for task, done:true
//bookshelf documentation: options with get request on front end

const Task = bookshelf.Model.extend({ //Schema and model 
    tableName: 'tasks'
})

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})