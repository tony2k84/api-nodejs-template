const sendResponse = require("../config/response.config");
const entityService = require("../services/entity.service");
const logger = require("../config/logger.config").getLogger(
  "entity.controller"
);

async function getAll(req, res, next) {
  try {
    const { count, rows } = await entityService.getAll(req.query);
    // set response headers
    res.header("X-Total-Count", count);

    // send
    sendResponse(req, res, 200, rows);
  } catch (err) {
    logger.error("error while getAll", err.message);
    next(err);
  }
}

async function getById(req, res, next) {
  const { id } = req.params;
  try {
    const result = await entityService.getById(id);
    if (result === null) {
      sendResponse(
        req,
        res,
        404,
        "E4041",
        "Not found",
        `Record with id '${id}' not found`
      );
      return;
    }
    sendResponse(req, res, 200, await entityService.getById(id));
  } catch (err) {
    logger.error("error while getById", err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    sendResponse(req, res, 201, await entityService.create(req.body));
  } catch (err) {
    logger.error("error while create", err.message);
    next(err);
  }
}

async function updateById(req, res, next) {
  const { id } = req.params;
  try {
    sendResponse(req, res, 200, await entityService.updateById(id, req.body));
  } catch (err) {
    logger.error("error while update", err.message);
    next(err);
  }
}

async function removeById(req, res, next) {
  const { id } = req.params;
  try {
    sendResponse(req, res, 200, await entityService.deleteById(id));
  } catch (err) {
    logger.error("error while remove", err.message);
    next(err);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  removeById,
};
