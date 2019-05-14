const mongoose = require("mongoose");
require("mongoose-type-email");

module.exports.createSchema = function(fields) {
  const res = {};
  fields.forEach(el => {
    const { name, required, type, unique } = el;
    if (name && typeof name === "string") {
      res[name] = {};
      if (required === true) res[name].required = true;
      if (unique === true) res[name].unique = true;

      switch (type) {
        case "string":
        case "password":
          res[name].type = mongoose.SchemaTypes.String;
          break;

        case "date":
          res[name].type = mongoose.SchemaTypes.Date;
          break;

        case "email":
          res[name].type = mongoose.SchemaTypes.Email;
          break;

        case "number":
          res[name].type = mongoose.SchemaTypes.Number;
          break;
        default:
          throw new Error(
            `Неподдерживаемый тип. Элемент ${JSON.stringify(el)}`
          );
      }
    } else
      throw new Error(`Не задано полe name. Элемент ${JSON.stringify(el)}`);
  });

  return res;
};
