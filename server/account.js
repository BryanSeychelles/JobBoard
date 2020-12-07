var dependencies = require("./dependencies.js");
 
module.exports = {
    signup: function(request, response) {
	var userType = request.body.type;
	var lowercaseEmail = (request.body.email).toLowerCase();
 	var sql = "SELECT password FROM Users WHERE email=\"" + lowercaseEmail + "\"";
	dependencies.connection.query(sql, function (error, results, fields) {
	    if (results.length === 1) {
		response.status(401).send({status: "Failure",
					   reason: "User already exists."});
		return ;
	    }
	    if (userType === "Applicants") {
		var sql = "INSERT INTO People (firstName,lastName) VALUES (\""
		    + request.body.firstName + "\",\""
		    + request.body.lastName + "\")";
	    } else if (userType === "Company") {
		var sql = "INSERT INTO Companies (name) VALUES (\""
		    + request.body.companyName + "\")";
	    }
	    dependencies.connection.query(sql, function (error, results, fields) {
		if (error) {
		    response.status(500).send({status: "Failure",
					       reason: "Error while creating profile."});
		} else {
		    var typeId = results.insertId;
		    dependencies.bcrypt.hash(request.body.password, 8, (error, hash) => {
			var sql = "INSERT INTO Users (typeName,typeId,email,password) VALUES (\""
			    + userType + "\",\""
	    		    + typeId + "\",\""
			    + lowercaseEmail + "\",\""
			    + hash + "\")";
			dependencies.connection.query(sql, function (error, results, fields) {
	    		    if (error)
				response.status(500).send({status: "Failure",
							   reason: "Error while creating user."});
			    else
				response.send({status: "Success",
			    		       reason: "Successfully signed up."});
			});
		    });
		}
	    });
	    
	});
    },
    signin: function(request, response) {
	var fields = "id,typeName,typeId,password,adminFlag";
	var lowercaseEmail = (request.body.email).toLowerCase();
	var sql = "SELECT " + fields + " FROM Users WHERE email=\"" + lowercaseEmail + "\"";
	dependencies.connection.query(sql, function (error, results, fields) {
	    if (error) {
		response.status(500).send({status: "Failure",
					   reason: "Error while signing in."});
	    }
	    else if (results.length === 0) {
		response.status(401).send({status: "Failure",
					   reason: "User does not exist."});
	    } else {
		var password = request.body.password;
		var hash = results[0].password;
		dependencies.bcrypt.compare(password, hash, (error, identical) => {
		    if (!identical)
			response.status(401).send({status: "Failure",
						   reason: "Wrong password."});
		    else {
			request.session.userId = results[0].id;
			request.session.typeName = results[0].typeName;
			request.session.typeId = results[0].typeId;
			request.session.adminFlag = results[0].adminFlag;
			response.send({status: "Success",
				       reason: "Successfully signed in."});
		    }
		});
	    }
	});
    },
    signout: function(request, response) {
	request.session.destroy();
    },
    edit: function(request, response) {},
    delete: function(request, response) {
	var userId = request.session.userId;
	var fields = "typeId,typeName";
	var sql = "SELECT " + fields + " FROM Users WHERE id=\"" + userId + "\"";
	dependencies.connection.query(sql, function (error, results, fields) {
	    var typeId = results[0].typeId;
	    var typeName = results[0].typeName;
	    var typeTable = (typeName === "Applicants" ? "People" : "Company");
	    sql = "DELETE FROM " + typeTable + " WHERE id=\"" + typeId + "\"";
	    dependencies.connection.query(sql, function (error, results, fields) {
		if (error) {
		    response.status(500).send({status: "Failure",
					       reason: "Error while deleting profile."});
		    return ;
		}
		sql = "DELETE FROM Users WHERE id=\"" + userId + "\"";
		dependencies.connection.query(sql, function (error, results, fields) {
		    if (error)
			response.status(500).send({status: "Failure",
						   reason: "Error while deleting account."});
		    else
			response.send({status: "Success",
				       reason: "Successfully deleted profile and account."});
		});
	    });
	});
    }
};
