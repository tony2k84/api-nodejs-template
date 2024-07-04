const express = require("express");
const router = express.Router();
const entityController = require("../controllers/entity.controller");

// get all entities
router.get("/", entityController.getAll);

// get entity by id
router.get("/:id", entityController.getById);

// create new entity
router.post("/", entityController.create);

// update entity
router.put("/:id", entityController.updateById);

// delete entity
router.delete("/:id", entityController.removeById);

module.exports = router;
