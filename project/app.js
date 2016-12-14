module.exports = function(app) {
    var model = require("./model/models.server.js")();
    require("./services/user.service.server.js")(app, model);
    require("./services/shop.service.server.js")(app, model);
    require("./services/order.service.server.js")(app, model);
};