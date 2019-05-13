const Author = require("../models/authors");
const { catchErr } = require("../utils/error");
const bcrypt = require("bcryptjs");

module.exports = {
  login: async function({ body: { email, password } }, res, next) {
    try {
      if (!email || !password)
        return catchErr(
          { statusCode: 400, message: "Не все поля заполнены" },
          next
        );

      const user = await Author.findOne({ email });
      if (!user)
        return catchErr(
          { statusCode: 400, message: "Пользователь не найден" },
          next
        );

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return catchErr({ statusCode: 400, message: "Неверный пароль" }, next);

      const { name, lastname, _id } = user;
      return res.json({ name, lastname, _id });
    } catch (error) {
      catchErr(error);
    }
  }
};
