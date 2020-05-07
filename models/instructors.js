exports.post = function (req, res) {

  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, preencha todos os campos!")
    }
    console.log(req.body["avatar_url"]);

  }
  return res.send(req.body)
}