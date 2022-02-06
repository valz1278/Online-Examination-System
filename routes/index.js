const express = require("express");
const router = express.Router();

router.use("/api/quiz", require("./quiz"));
router.use("/api/student", require("./student"));
router.use("/api/result", require("./result"));
router.use("/api/enrollment", require("./enrollment"));
router.use("/api/admin", require("./admin"));
router.use("/api/teacher", require("./teacher"));

module.exports = router;
