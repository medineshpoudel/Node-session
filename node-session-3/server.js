const express = require("express")
const router = express.Router()
const path = require("path")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT || 3000

router.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname, "/form.html"))
})

router.post("/login",(req,res) => {
    let data={}
    if (req.body.username === "ashish" && req.body.password === "1234"){
        data = { username: "ashish", friends: ["abc", "xyz"]}
        res.status(200).send(data)
        console.log("success")
    }
    else{
        res.send("failure")
        console.log("failure")
    }
})

router.get ("/register",(req,res) => {
    res.send("Registered")
})

router.get ("/logout",(req,res) => {
    res.send("logout")
})
app.use("/", router) //binding with the app,  base url ma bind gareko, base url pachi j aaucha bind garcha

app.listen(port, () => {
    console.log(`Server is listening to the port ${port}`)
})