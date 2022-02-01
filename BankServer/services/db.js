//import mongoose to connect server and database
          //library is aasigned to a variable mongoose 
const mongoose = require('mongoose')

//connect server and database (connection string)
mongoose.connect('mongodb://localhost:27017/bank',{
    useNewUrlParser:true
})

//our app model creation ie; it is the collection itself
const User = mongoose.model('User',{
    acno:Number,
    uname:String,
    password:String,
    balance:Number,
    transaction:[]
})

//export model
module.exports={
    User
}