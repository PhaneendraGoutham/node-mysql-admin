var express = require('express')
var router = express.Router()
var table = require("../controller/table")

router.post("/list", table.list)
router.post("/column/list", table.columnlist)
router.post("/rows", table.rows)

module.exports = router
