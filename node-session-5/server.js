const express = require("express");
const fs = require("fs")
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const validation = require("./validator")
const schema = require("./schema")

const port = process.env.PORT || 3000;

// CRUD OPERATIONS

//READ OPERATION
router.get("/todos", (req, res) => {
    // res.sendFile(__dirname + "/data.html");
    var data = fs.readFileSync("data.json")
    data = JSON.parse(data)
    // const data = require ("./data.json")
    // res.status(200).send(data)
  });

//WRITE  OPERATION
router.post("/todos", (req,res) => {
    var data = fs.readFileSync("data.json")
    data = JSON.parse(data)
    

    data.push({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    })
    
    var newData = JSON.stringify(data)
    fs.writeFile("data.json", newData, (err) => {
        //err checking
        if (err) throw err

        console.log("New data added")
    })
    res.status(200).send(data)
})




// UPDATE OPERATIONS
router.put("/todos/:title", validation.validateBody(schema.updateTodoSchema),(req,res) => {
    var titleParam = req.params.title
    // var title = req.body.title
    var descr = req.body.description 
    var status = req.body.status

    var data = fs.readFileSync(__dirname + "/data.json")
    data = JSON.parse(data)

    var index = data.findIndex((data) => {
        return (data.title === titleParam)
    })

    if (index >= 0){
        var updateData = data[index]
        updateData.description = descr
        updateData.status = status
    
    var newData = JSON.stringify(data)
    fs.writeFile(__dirname + "/data.json", newData, (err) => {
        if (err){
            console.log(err)
        }
        else{
            res.status(200).send(data)
        }
    })
    }
    
})


//DELETE OPERATION
router.delete("/todos/:title", (req,res) => {
    var titleParam = req.params.title
    // var title = req.body.title


    var data = fs.readFileSync(__dirname + "/data.json")
    data = JSON.parse(data)

    var index = data.findIndex((data) => {
        return (data.title === titleParam)
    })

    if (index >= 0){
        data.splice(index, 1)
    
    var newData = JSON.stringify(data)
    fs.writeFile(__dirname + "/data.json", newData, (err) => {
        if (err) {
            console.log(err)
        }
        else{
            res.status(200).send(data)
        }
    })
    }
})


app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on the sss port ${port}`);
});