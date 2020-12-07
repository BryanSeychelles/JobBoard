var dependencies = require("./dependencies.js");

module.exports = {
    list: function(request, response) {
	var keys = Object.keys(request.body);
	var fields = "name,logoURL,description,creationYear,numberEmployees";
	var sql = "SELECT " + fields + " FROM Companies WHERE id IS NOT NULL";
	if (keys.length !== 0) {
	    for (key of keys) {
		if (key === "name")
		    sql += " AND name LIKE %" + request.body.name + "%";
		else if (key === "employees" || key === "creation")
		    sql += " AND " + key + " >= " + (request.body)[key];
	    }
	}
	dependencies.connection.query(sql, function (error, results, fields) {
	    if (error)
		response.status(500).send({status: "Failure",
					   reason: "Error while fetching companies."});
	    else
		response.send(results);
	});
    },
    details: function(request, response) {
    	var companyId = request.params.id;
	if (isNaN(companyId)) {
	    response.status(403).send({status: "Failure",
				       reason: "Invalid parameters."});
	    return ;
	}
	var fields = "name,logoURL,description,creationYear,numberEmployees";
	var sql = "SELECT " + fields + " FROM Companies WHERE id=" + companyId;
	dependencies.connection.query(sql, function (error, results, fields) {
	    if (error)
		response.status(500).send({status: "Failure",
					   reason: "Error while fetching company details."});
	    else
		response.send(results);
	});
    },
    offers: function(request, response) {
	var companyId = request.params.id;
	if (isNaN(companyId)) {
	    response.status(403).send({status: "Failure",
				       reason: "Invalid parameters, search cancelled."});
	    return ;
	}
	var fields = "title,description,type,length,country,city,updatedAt,salary";
	var sql = "SELECT " + fields + " FROM Offers WHERE companyId=" + companyId;
	dependencies.connection.query(sql, function (error, results, fields) {
	    if (error)
		response.status(500).send({status: "Failure",
					   reason: "Error while getting company offers."});
	    else
		response.send(results);
	});
    }
};
