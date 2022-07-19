const { Router } = require("express");
const { dietsAll } = require("./dietsF");
const router = Router();

router.get("/", dietsAll);

module.exports = router;
