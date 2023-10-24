const errorHandler = require("./error-handler");
import * as constants from "../constants/index";

exports.normalizer = (
  req,
  res,
  { result = "", messageCode, type = "single", status = 200 }
) => {
  const page = req.query.page;
  const size = req.query.size ? req.query.size : 5;

  let message;

  if (messageCode !== "") {
    message = constants.messages.messageCodes[messageCode];
  }

  switch (type) {
    case "single":
      return res.status(status).json({
        result: result,
        message: message,
      });

    case "multi":
      return res.status(status).json({
        result: result,
        message: message,
      });

    case "multi/pagination":
      let total = Math.floor(result.length / size) + 1;
      if (result.length % size === 0) total = total - 1;
      const startIndex = (page - 1) * size;
      const endIndex = page * size;
      result = result.slice(startIndex, endIndex);
      return res.status(status).json({
        result: result,
        message: message,
        page: +page,
        size: +size,
        total: total,
      });
  }
};
