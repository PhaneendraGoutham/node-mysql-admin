var util = require("../util")
var mysql = require("../mysql")
var _ = require("lodash")

exports.list = function (req, res) {

	var dbname = req.body.dbname

	if(!dbname) {
		return util.err(res, "Database not selected")
	}

	var sql = "SHOW TABLES IN " + dbname

	mysql.query(sql, [], function (err, result) {

		if(err) {
			return util.err(res, "Database error")
		}

		var tables = []

		for (var i = 0; i < result.length; i++) {
		 	tables.push(result[i]["Tables_in_" + dbname])
		 } 

		util.ok(res, "OK", tables)

	})
	
}


exports.columnlist = function (req, res) {

	var dbname = req.body.dbname
	var tablename = req.body.tablename

	if(!dbname) {
		return util.err(res, "Database not selected")
	}

	if(!tablename) {
		return util.err(res, "Table not selected")
	}

	var sql = "SHOW COLUMNS IN "+ tablename +" IN " + dbname


	mysql.query(sql, [], function (err, result) {

		if(err) {
			return util.err(res, "Database error")
		}

		util.ok(res, "OK", result)

	})
	
}

exports.rows = function (req, res) {

	var dbname = req.body.dbname
	var tablename = req.body.tablename
	var limit = req.body.limit
	var offset = req.body.offset

	if(!dbname) {
		return util.err(res, "Database not selected")
	}

	if(!tablename) {
		return util.err(res, "Table not selected")
	}

	if(!limit) {
		limit = 10
	}

	if(offset == null || offset == undefined) {
		offset = 0
	}

	var sql = "SELECT * FROM " + dbname +"."+ tablename + " LIMIT " + limit + " OFFSET " + offset
	

	mysql.query(sql, [], function (err, result) {

		if(err) {
			return util.err(res, "Database error")
		}

		util.ok(res, "OK", result)

	})
	
}