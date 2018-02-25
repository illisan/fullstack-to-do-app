const express = require('express')
const app = express()
const port = process.argv[2] || 8080 


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

app.get('/tasks',(req, res)=>{
    //return tasks
    console.log('/')
    res.send('it lives!')
})

app.post('/tasks', (req, res) => {
  //save tasks
})


app.listen(port, () => {
    console.log(`Listening on ${port}`)
})