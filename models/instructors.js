const fs = require("fs")
const data = require("../data.json")
const moment = require("moment")

exports.index = function (req, res) {
  return res.render("../views/instructors/index", { instructors: data.instructors })
}

exports.saveOrUpdate = function (req, res) {

  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, preencha todos os campos!")
    }
  }

  let { id, avatar_url, birth, name, services, gender } = req.body;
  birth = Date.parse(req.body.birth);
  let editar = false;

  if (id == null) {

    const created_at = Date.now();
    id = Number(data.instructors.length) + 1;
    data.instructors.push({
      id, name, avatar_url, birth, services, gender, created_at
    });
  } else {
    editar = true
    const foundInstructor = data.instructors.find(function (instructor) {
      return id == instructor.id
    })
    if (!foundInstructor) return send("Instrutor não encontrado!")
    const instructor = {
      ...foundInstructor,
      avatar_url, birth, name, services, gender
    }
    data.instructors[id - 1] = instructor;
  }

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error")

    return editar ? res.redirect(`/instructors/${id}`) : res.redirect(`/instructors`)
  })
}

exports.show = function (req, res) {
  const { id } = req.params

  moment.locale("pt-br");

  const foundInstructor = data.instructors.find(function (instructor) {
    return id == instructor.id
  })

  const instructor = foundInstructor ? {
    ...foundInstructor,
    age: moment().diff(foundInstructor.birth, 'years', false),
    gender: foundInstructor.gender === "M" ? "Masculino" : "Feminino",
    services: foundInstructor.services.split(","),
    created_at: moment(foundInstructor.created_at).format('L')
  } : "";

  return foundInstructor != null ? res.render("../views/instructors/show", { instructor }) : res.send("Não encontrou");
}

exports.edit = function (req, res) {
  const { id } = req.params

  moment.locale("en");

  const foundInstructor = data.instructors.find(function (instructor) {
    return id == instructor.id
  })

  const instructor = foundInstructor ? {
    ...foundInstructor,
    birth: moment(foundInstructor.birth).format('YYYY-MM-DD'),
  } : "";

  return foundInstructor != null ? res.render("../views/instructors/create", { instructor }) : res.send("Não encontrou");
}

exports.delete = function (req, res) {
  const { id } = req.body;
  console.log(id);

  const filteredInstructor = data.instructors.filter(function (instructor) {
    console.log(instructor.id != id ? true : false);
    return instructor.id != id ? true : false;
  })
  data.instructors = filteredInstructor;
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error");
    return res.redirect(`/instructors`)
  })
}

