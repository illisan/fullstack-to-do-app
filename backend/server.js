const express = require('express')
const app = express()
const port = process.argv[2] || 8080 
const bodyParser =require('body-parser')


// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//         database: 'fullstack_todo',
//         user: 'sandra',
//         password: ''
//     }
// })

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
  let newTask ={
      task: req.body.tasks,
      done: req.body.done,
  }
  res.json(newTask)
})


app.listen(port, () => {
    console.log(`Listening on ${port}`)
})