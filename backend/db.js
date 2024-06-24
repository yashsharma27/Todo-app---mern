const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://sharmayash:ttkVfWgwPLvoJ8bo@cluster0.mcawmil.mongodb.net/")

const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const todo = mongoose.model('todos', todoSchema)

module.exports = {
    todo
}

