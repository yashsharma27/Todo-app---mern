const express = require("express");
const { createTodo } = require("./types");
const { todo } = require("./db");
const app = express()
const cors = require("cors")

app.use(cors());
app.use(express.json());

app.post("/todo", async function(req, res){
    const createdPayload = req.body
    const parsedPayload = createTodo.safeParse(createdPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "Wrong inputs"
        })
        return;
    }
    // putting in mongoDb
    await todo.create({
        title : createdPayload.title,
        description : createdPayload.description,
        completed : false
    })

    res.json({
        msg : "Todo created"
    })
})

app.get("/todos", async function(req, res){
    const todos = await todo.find(); // it is a promise 

    res.json({
        todos
    })
})

app.put("/completed", async function(req, res){
    const updatedPayload = req.body
    const parsedPayload = createTodo.safeParse(updatedPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "Wrong inputs"
        })
        return;
    }

    await todo.update({
        _id : req.body.id
    }, {
        completed : true
    })

    res.json({
        msg : "Todo marked as done"
    })

})

app.listen(3000)