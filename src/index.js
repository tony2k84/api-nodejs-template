const PORT = process.env.PORT || 3000;
const app = require("./app");
const db = require("./services/db.service");
const logger = require("./common/logger.common").getLogger("index");

db.syncModel().then(() => {
  app.listen(PORT, () => {
    logger.info(`app started on port ${PORT}`);
  });
});
