const express = require('express')
const routes = express.Router()
const Instructors = require("./models/instructors")

routes.get("/", function (req, res) {
  return res.redirect("/instructors")
})
routes.get("/instructors", Instructors.index)

routes.get("/instructors/create", function (req, res) {
  return res.render("instructors/create")
})
routes.get("/instructors/:id", Instructors.show)
routes.get("/instructors/edit/:id", Instructors.edit)

routes.get("/members", function (req, res) {

  return res.send("members")
})

routes.post("/instructors", Instructors.saveOrUpdate)
routes.put("/instructors", Instructors.saveOrUpdate)
routes.delete("/instructors", Instructors.delete)




module.exports = routes;