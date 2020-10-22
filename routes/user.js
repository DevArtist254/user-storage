const express = require("express")
const router = express.Router()

const User = require("../models/User")

router.post("/", (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const phone = req.body.phone

  console.log(name)
  console.log(email)
  console.log(phone)

  res.redirect("/")
})

module.exports = router
