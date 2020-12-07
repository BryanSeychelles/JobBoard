var dependencies = require("./dependencies.js");
dependencies.startServer(1337);

var account = require("./account.js");
var company = require("./company.js");
var cors = require("./cors.js");
var offers = require("./offers.js");
//var upload = require("./upload.js");

dependencies.jobs.route("/signup")
    .options([cors.accept, cors.send])
    .post([cors.accept, account.signup]);
dependencies.jobs.route("/signin")
    .options([cors.accept, cors.send])
    .post([cors.accept, account.signin]);
dependencies.jobs.route("/signout")
    .options([cors.accept, cors.send])
    .get([cors.accept, account.signout]);
// Access self account info, either Applicant or Company
// dependencies.jobs.route("/account")
//     .options([cors.accept, cors.send])
//     .put([cors.accept, account.info]);
// Access my own offers without id
// dependencies.jobs.route("/account/offers")
//     .options([cors.accept, cors.send])
//     .put([cors.accept, account.offers]);
// Edit account
// dependencies.jobs.route("/account/edit")
//     .options([cors.accept, cors.send])
//     .put([cors.accept, account.edit]);
// UPLOAD ROUTES
// /upload/image
// /upload/resume
// /upload/letter
dependencies.jobs.route("/account/delete")
    .options([cors.accept, cors.send])
    .delete([cors.accept, account.delete]);
dependencies.jobs.route("/offers")
    .options([cors.accept, cors.send])
    .get([cors.accept, offers.list]);
dependencies.jobs.route("/offer/create")
    .options([cors.accept, cors.send])
    .post([cors.accept, offers.create]);
dependencies.jobs.route("/offer/:id/apply")
    .options([cors.accept, cors.send])
    .post([cors.accept, offers.apply]);
// Applications for each offer, based on id
// dependencies.jobs.route("/offer/:id/applications")
//     .options([cors.accept, cors.send])
//     .post([cors.accept, offers.applications]);
dependencies.jobs.route("/offer/:id/edit")
    .options([cors.accept, cors.send])
    .put([cors.accept, offers.edit]);
dependencies.jobs.route("/offer/:id/delete")
    .options([cors.accept, cors.send])
    .delete([cors.accept, offers.delete]);
dependencies.jobs.route("/companies")
    .options([cors.accept, cors.send])
    .get([cors.accept, company.list]);
dependencies.jobs.route("/companies/:id")
    .options([cors.accept, cors.send])
    .get([cors.accept, company.details]);
dependencies.jobs.route("/companies/:id/offers")
    .options([cors.accept, cors.send])
    .get([cors.accept, company.offers]);
