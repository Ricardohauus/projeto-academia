const fs = require("fs")
const data = require("../data.json")
const moment = require("moment")

exports.index = function (req, res) {
  return res.render("../views/members/index", { members: data.members })
}
exports.create = function (req, res) {
  return res.render("members/create")
}
exports.saveOrUpdate = function (req, res) {

  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, preencha todos os campos!")
    }
  }

  let { id, avatar_url, birth, name, gender } = req.body;
  birth = Date.parse(req.body.birth);
  let editar = false;

  if (id == null) {

    const created_at = Date.now();
    id = Number(data.members.length) + 1;
    data.members.push({
      id, name, avatar_url, birth, gender, created_at
    });
  } else {
    editar = true
    let index = 0;
    const foundMember = data.members.find(function (member, foundIndex) {
      if (id == member.id) {
        index = foundIndex;
        return true
      }
    })
    if (!foundMember) return send("Membro não encontrado!")
    const member = {
      ...foundMember,
      avatar_url, birth, name, gender
    }
    data.members[index] = member;
  }

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error")

    return editar ? res.redirect(`/members/${id}`) : res.redirect(`/members`)
  })
}

exports.show = function (req, res) {
  const { id } = req.params

  moment.locale("pt-br");

  const foundMember = data.members.find(function (member) {
    return id == member.id
  })

  const member = foundMember ? {
    ...foundMember,
    age: moment().diff(foundMember.birth, 'years', false),
    gender: foundMember.gender === "M" ? "Masculino" : "Feminino",
    created_at: moment(foundMember.created_at).format('L')
  } : "";

  return foundMember != null ? res.render("../views/members/show", { member }) : res.send("Não encontrou");
}

exports.edit = function (req, res) {
  const { id } = req.params

  moment.locale("en");

  const foundMember = data.members.find(function (member) {
    return id == member.id
  })

  const member = foundMember ? {
    ...foundMember,
    birth: moment(foundMember.birth).format('YYYY-MM-DD'),
  } : "";

  return foundMember != null ? res.render("../views/members/create", { member }) : res.send("Não encontrou");
}

exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredMember = data.members.filter(function (member) {
    return member.id != id ? true : false;
  })
  data.members = filteredMember;
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error");
    return res.redirect(`/members`)
  })
}

