var dependencies = require("./dependencies.js");

module.exports = {
    list: function(request, response) {
	var keys = Object.keys(request.body);
	var aFields = "a.id,a.title,a.description,a.type,a.length,a.country,a.city,a.updatedAt,a.salary";
	var bFields = "b.name AS companyName"
	var fields = aFields + "," + bFields;
	var sql = "SELECT " + fields + " FROM Offers a, Companies b WHERE b.id=a.companyId";
	if (keys.length !== 0) {
	    for (key of keys) {
		if (key === "title")
		    sql += " AND title LIKE %" + request.body.title + "%";
		else if (key === "salary")
		    sql += " AND salary >= " + request.body.salary;
		else
		    sql += " AND " + key + "=" + request.body[key];
	    }
	}
	dependencies.connection.query(sql, function (error, results, fields) {
	    if (error)
		response.status(500).send({status: "Failure",
					   reason: "Error while fetching offers."});
	    else
		response.send(results);
	});
    },
    create: function(request, response) {
	var typeName = request.session.typeName;
	var typeId = request.session.typeId;
	// if (typeName !== "Company" || !typeId) {
	//     response.status(401).send({status: "Failure",
	// 			       reason: "Not logged in or access denied."});
	//     return ;
	// }
	var content = {companyId: typeId,
		       title: request.body.title,
		       description: request.body.description,
		       type: request.body.type,
		       length: request.body.length,
		       country: request.body.country,
		       city: request.body.city,
		       updatedAt: "NOW()",
		       salary: request.body.salary};
	var columns = "(companyId,title,description,type,length,country,city,updatedAt,salary)";
	var sql = "INSERT INTO Offers " + columns + " VALUES ("
	    + 2/*content.companyId*/ + ",\""
	    + content.title + "\",\""
	    + content.description + "\",\""
	    + content.type + "\",\""
	    + content.length + "\",\""
	    + content.country + "\",\""
	    + content.city + "\","
	    + content.updatedAt + ",\""
	    + content.salary + "\")";
	dependencies.connection.query(sql, function (error, results, fields) {
	    if (error) {
		console.log(sql, error);
		response.status(500).send({status: "Failure",
					   reason: "Error while creating offer."});
	    }
	    else
		response.send({status: "Success",
			       reason: "Successfully created offer."});
	});
    },
    apply: function(request, response) {
	var userId = request.session.userId;
	var typeName = request.session.typeName;
	if (!userId || typeName === "Company") {
	    response.status(403).send({status: "Failure",
				       reason: "Log in as applicant."});
	    return ;
	}
	var content = {offerId: request.params.id,
		       applicantIdId: userId,
		       appliedAt: "NOW()"};
	var columns = "(offerId,applicantId,appliedAt)";
	var sql = "INSERT INTO Applications " + columns + " VALUES (\""
	    + content.offerId + "\",\""
	    + content.applicantId + "\","
	    + content.appliedAt + ")";
	dependencies.connection.query(sql, function (error, results, fields) {
	    if (error)
		response.status(500).send({status: "Failure",
					   reason: "Error while applying."});
	    else
		response.send({status: "Success",
			       reason: "Successfully applied to offer."});
	});

    },
    edit: function(request, response) {
	var typeName = request.session.typeName;
	var typeId = request.session.typeId;
	if (typeName !== "Company" || !typeId) {
	    response.status(401).send({status: "Failure",
				       reason: "Not logged in or access denied."});
	    return ;
	}
	var offerId = request.params.id;
	if (isNaN(offerId)) {
	    response.status(403).send({status: "Failure",
				       reason: "Invalid parameters, edition cancelled."});
	    return ;
	}
	var sql = "SELECT companyId FROM Offers WHERE id=" + offerId;
	dependencies.connection.query(sql, function (error, results, fields) {
	    var postingCompanyId = results[0].companyId;
	    if (typeId !== postingCompanyId) {
		response.status(403).send({status: "Failure",
					   reason: "Not your offer, edition cancelled"});
		return ;
	    }
	    var body = request.body;
	    var keys = Object.keys(body);
	    var columns = "";
	    for (key of keys) {
		if (body[key])
		    columns += key + "=\"" + body[key] + "\",";
	    }
	    var sql = "UPDATE Offers SET " + columns
		+ "id=" + offerId + " WHERE id=" + offerId;
	    dependencies.connection.query(sql, function (error, results, fields) {
		if (error)
		    response.status(500).send({status: "Failure",
					       reason: "Error while updating offer."});
		else
		    response.send({status: "Success",
				   reason: "Successfully updated offer."});
	    });
	});
    },
    delete: function(request, response) {
	var offerId = request.params.id;
	if (isNaN(offerId)) {
	    response.status(403).send({status: "Failure",
				       reason: "Invalid parameters, deletion cancelled."});
	    return ;
	}
	var sessionCompanyId = request.session.typeId;
	var sql = "SELECT companyId FROM Offers WHERE id=" + offerId;
	dependencies.connection.query(sql, function (error, results, fields) {
	    var postingCompanyId = results[0].companyId;
	    if (sessionCompanyId !== postingCompanyId) {
		response.status(403).send({status: "Failure",
					   reason: "Not your offer, deletion cancelled"});
		return ;
	    }
	    sql = "DELETE FROM Offers WHERE id=" + offerId;
	    dependencies.connection.query(sql, function (error, results, fields) {
		if (error)
		    response.status(500).send({status: "Failure",
					       reason: "Error while deleting offer."});
		else
		    response.send({status: "Success",
				   reason: "Successfully deleted offer."});
	    });
	});
    }
};
