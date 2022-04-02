const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hi ashish!')
})

app.listen(3000, () => console.log('Server ready'))

const http = require("http")
const dt = require("./dateTime")
const url = require("url")
const fs = require("fs")

const port = process.env.PORT || 3000

const server = http.createServer((req,res)=> {
  const test = url.parse(req.url).query
  console.log(test)
  console.log(req.url)
  fs.readFile("writeFile.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.write(data);
    return res.end()
  })

})

server.listen(port, () => {
  console.log(dt.myDateTime())
  console.log(`Server Runnning on Port ${port}`)
})



// const express = require ("express")
// const app = express()
// const router = express.Router()

// const port = process.env.PORT || 3000

// router.get("/login", (req,res) => {
//   res.send("Login Success")

// })

// router.get("/register", (req,res) => {
//   res.send("Trying to Register")
  
// })

// router.get("/logout", (req,res) => {
//   res.send("Trying to logout !")
  
// })
// app.use("/", router)

// app.listen(port, () => {
//   console.log(`Server runnign at port ${port}`)
// })