const express = require("express");
const fs = require("fs")
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function test(req, res, next)
const port = process.env.PORT || 3000;


router.get("/login", (req, res) => {
  console.log(req.params);
  res.sendFile(__dirname + "/form.html");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (username === "ashish" && password === "1234") {
      const data = require("./data.json")
      console.log("sucess")
      res.send(data)
  } else {
    res.send("Invalid email or password");
  }
});

router.get("/todos", (req, res) => {
    // res.sendFile(__dirname + "/data.html");
    var data = fs.readFileSync("data.json")
    data = JSON.parse(data)
    // const data = require ("./data.json")
    // res.status(200).send(data)
  });

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

router.delete("/todos", (req,res) => {
    const data = require("./data.json")
    res.status(200).send(data)
})

// router.get("/", (req,res) => {
//     res.sendFile(path.join(__dirname, "data.html"))
// })


app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on the port ${port}`);
});