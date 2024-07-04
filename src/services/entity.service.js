const { QUERY_LIMIT, PAGE_OFFSET } = require("../common/config.common");
const { Entity } = require("./db.service");

async function getAll({ limit = QUERY_LIMIT, offset = PAGE_OFFSET }) {
  const { count, rows } = await Entity.findAndCountAll({ limit, offset });

  return {
    count,
    rows,
  };
}

async function getById(id) {
  return Entity.findByPk(id);
}

async function create(object) {
  const record = await Entity.create(object);
  return record.toJSON();
}

async function updateById(id, object) {
  const [updatedObject, updatedCount] = await Entity.update(object, {
    where: { id },
    returning: true,
  });

  // console.log(updatedObject, updatedCount);
  return { id };
}

async function deleteById(id) {
  const deleted = await Entity.destroy({ where: { id } });
  return { id, deleted };
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
