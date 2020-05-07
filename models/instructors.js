const fs = require("fs")
const data = require("../data.json")
const moment = require("moment")
exports.post = function (req, res) {

  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, preencha todos os campos!")
    }
  }
  let { avatar_url, birth, name, services, gender } = req.body;

  birth = Date.parse(req.body.birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length) + 1;

  data.instructors.push({
    id, name, avatar_url, birth, services, gender, created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error")

    return res.redirect("/instructors")
  })


}

exports.show = function (req, res) {
  const { id } = req.params
  moment.locale("pt-br");
  const foundInstructor = data.instructors.find(function (instructor) {
    return id == instructor.id
  })



  const instructor = {
    ...foundInstructor,
    age: moment().diff(foundInstructor.birth, 'years', false),
    gender: foundInstructor.gender === "M" ? "Masculino" : "Feminino",
    services: foundInstructor.services.split(","),
    created_at: moment(foundInstructor.created_at).format('L'),
  }

  foundInstructor != null ? res.render("../views/instructors/show", { instructor }) : res.send("Não encontrou");
}