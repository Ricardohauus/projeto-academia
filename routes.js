const express = require('express')
const routes = express.Router()
const Instructors = require("./controllers/instructors")
const Members = require("./controllers/members")

routes.get("/", function (req, res) {
  return res.redirect("/instructors")
})
routes.get("/instructors/create", function (req, res) {
  return res.render("instructors/create")
})
routes.get("/instructors", Instructors.index)
routes.get("/instructors/:id", Instructors.show)
routes.get("/instructors/edit/:id", Instructors.edit)
routes.post("/instructors", Instructors.saveOrUpdate)
routes.put("/instructors", Instructors.saveOrUpdate)
routes.delete("/instructors", Instructors.delete)

routes.get("/", function (req, res) {
  return res.redirect("/members")
})
routes.get("/members/create", function (req, res) {
  return res.render("members/create")
})
routes.get("/members", Members.index)
routes.get("/members/:id", Members.show)
routes.get("/members/edit/:id", Members.edit)
routes.post("/members", Members.saveOrUpdate)
routes.put("/members", Members.saveOrUpdate)
routes.delete("/members", Members.delete)




module.exports = routes;