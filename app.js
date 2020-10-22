require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const PORT = 3000
const connectDB = require("./config/db")
const cors = require("cors")

const User = require("./models/User")

//1.0
const app = express()

//1.01
app.use(express.static("public"))

//2.0
app.set("view engine", "ejs")

//3.30
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

//Connect Database
connectDB()

app.get("/", (req, res) => {
  res.render("index")
})

app.post("/", (req, res) => {
  const fullName = req.body.name
  const email = req.body.email
  const phone = req.body.phone

  const newUser = new User({
    name: fullName,
    email: email,
    phone: phone,
  })

  newUser.save((err) => {
    if (!err) {
      res.redirect("/success")
    } else {
      res.redirect("/failure")
      console.log(err)
    }
  })
})

app.get("/success", (req, res) => {
  res.render("success")
})

app.get("/failure", (req, res) => {
  res.render("failure")
})

app.use("/api/users", require("./routes/user"))

app.listen(PORT, () => {
  console.log(`DevArtist Server is runing on port ${PORT}`)
})
