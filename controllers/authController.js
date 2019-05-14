const Author = require("../models/authors");
const { catchErr } = require("../utils/error");
const bcrypt = require("bcryptjs");

module.exports = {
  login: async function(req, res, next) {
    const { email, password } = req.body;

    try {
      if (!email || !password)
        return catchErr(
          { statusCode: 400, message: "Не все поля заполнены" },
          next
        );

      req.user = await Author.findOne({ email });
      if (!req.user)
        return catchErr(
          { statusCode: 400, message: "Пользователь не найден" },
          next
        );

      const isMatch = await bcrypt.compare(password, req.user.password);
      if (!isMatch)
        return catchErr({ statusCode: 400, message: "Неверный пароль" }, next);

      return next();
    } catch (error) {
      catchErr(error, next);
    }
  }
};
