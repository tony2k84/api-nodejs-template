const app = require("./app");
const { PORT } = require("./config/constants.config");
const db = require("./services/db.service");
const logger = require("./config/logger.config").getLogger("index");

db.syncModel().then(() => {
  app.listen(PORT, () => {
    logger.info(`app started on port ${PORT}`);
  });
});
