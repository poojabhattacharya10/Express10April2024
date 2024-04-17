const express = require('express')
const app = express();

const users  = require('./MOCK_DATA.json')
const fs = require('fs')

app.use(express.json())
app.get('/users' , (req,res) => {
    res.json(users)
})

// app.get('/user/:id' , (req,res) => {
//     let id  = req.params.id
//     // let user = select * from users where id  = req.params.id
//     let user = users.find((user)=> user.id === parseInt(id))
//     console.log(user)
//     res.json(user)
// })

app.get('/user/:first_name' , (req,res) => {
    let first_name = req.params.first_name;
    console.log(first_name, 'first_name')
    // let user = select * from users where id  = req.params.id
    let user = users.find((user)=> user.first_name === first_name)
    console.log(user)
    res.json(user)
})

app.post('/user/add' , (req,res) => {
    console.log(req.body);
    users.push(req.body)
    fs.writeFile('MOCK_DATA.json', JSON.stringify(users) , (err) => {}) // not use append bcz we are passing users not user
    res.end('<h1>post data ....</h1>')
})

app.delete('/user/:id' , (req,res) => {
    let index = users.findIndex((user ) => user.id === parseInt(req.params.id))
    users.splice(index , 1)
    fs.writeFile('MOCK_DATA.json', JSON.stringify(users) , (err) => {})
    res.end('<h1>Remove from array of objects</h1>')
})


app.put('/user/:id' , (req,res) => {
    let index = users.findIndex((user ) => user.id === parseInt(req.params.id))
    users[index].first_name = 'Michel New'
    fs.writeFile('MOCK_DATA.json', JSON.stringify(users) , (err) => {})
    res.end('<h1>Put ...</h1>')
})

app.listen(3000 , (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Server is running at port no. : 3000");
    }
})


// get                   /users
// get                   /user/:id
// post(add)                 /user
// put(update)           /user/:id
// update student set name = 'abc' where id = 101
// delete                /user/:id



//  req.body :::: data coming from form or creating new thing/form/book/courese/product