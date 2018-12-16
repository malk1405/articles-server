module.exports.catchErr = (err, next) => {
  if (!err.statusCode) err.statusCode = 500;
  if (!err.message) err.message = "Database Error";

  next(err);
};
