
var mysql = require("mysql");
var md5 = require('md5');

function REST_ROUTER(router, connection, md5) {
var self = this;
self.handelRoutes(router, connection, md5);
}
REST_ROUTER.prototype.handelRoutes = function(router, connection, md5) {
router.get("/", function(req, res) {
  res.json({
    "message": "hello world"
  });
});


  }
module.exports = REST_ROUTER;
