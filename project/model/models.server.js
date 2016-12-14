module.exports = function () {

    var mongoose = require('mongoose');
    var connectionString = 'mongodb://localhost/webdev-project-2016';
    if(process.env.MLAB_DB_USERNAME) {
        connectionString = process.env.MLAB_DB_URL_INIT +
            process.env.MLAB_DB_USERNAME + ":" +
            process.env.MLAB_DB_PASSWORD +
            process.env.MLAB_DB_URL_END + '/' +
            process.env.MLAB_DB_NAME;
    }
    mongoose.connect(connectionString);

    var UserModel = require("./user/user.model.server")();
    var ShopModel = require("./shop/shop.model.server")();
    var OrderModel = require("./order/order.model.server")();

    var model = {
        UserModel: UserModel,
        ShopModel: ShopModel,
        OrderModel: OrderModel
    };

    return model;
};