const express = require("express")

const app = express()

const port = process.env.PORT || 3000

app.use(express.static(__dirname));
app.get("/", (req, res) => res.sendFile(__dirname + "/form.html"))


app.post("/", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" })
  if (req.body.password === "leapfrog"){
    const data = require("./data.json")
    console.log("success")
    
    res.status(200).send(data)

  }
  else{
      res.write(`WRONG PASSWORD! <br> <b>${req.body.username} </b>, Did you Forgot your password ?`)
      console.log("wrong")
  }
  res.end()
})

app.listen(port, () => {
  console.log(`we are on the port ${port}`)
})

//checking