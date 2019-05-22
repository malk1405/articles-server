const mongoose = require("mongoose");
require("mongoose-type-email");

createSchema = function(fields) {
  const res = {};
  fields.forEach(el => {
    const { name, required, type, unique } = el;
    if (name && typeof name === "string") {
      res[name] = {};
      if (required === true) res[name].required = true;
      if (unique === true) res[name].unique = true;
      if (typeof type === "undefined")
        res[name].type = mongoose.SchemaTypes.String;
      else
        switch (type) {
          case "text":
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

          case "id":
            res[name].type = mongoose.Types.ObjectId;
            break;

          case "array":
            if (!Array.isArray(el.of))
              throw new Error("Атрибут of должен быть массивом");
            res[name].type = [createSchema(el.of)];
            break;
          default:
            throw new Error(
              `Неподдерживаемый тип: "${type}". Элемент ${JSON.stringify(el)}`
            );
        }
    } else
      throw new Error(`Не задано полe name. Элемент ${JSON.stringify(el)}`);
  });

  return res;
};

module.exports.createSchema = createSchema;
