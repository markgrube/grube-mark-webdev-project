"use strict"
module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");
    var OrderSchema = require("./order.schema.server")();
    var OrderModel = mongoose.model("OrderModel", OrderSchema);

    var api = {
        findCartForUser: findCartForUser,
        findOrdersForUser: findOrdersForUser,
        findOrderItemById: findOrderItemById,
        addItemToCart: addItemToCart,
        deleteFromCart: deleteFromCart,
        placeOrder: placeOrder
    };
    return api;

    function findCartForUser(userId) {
        return OrderModel.find({userId: userId, ordered: false});
    }

    function findOrdersForUser(userId) {
        return OrderModel.find({userId: userId, ordered: true});
    }

    function findOrderItemById(orderId) {
        return OrderModel.findOne({_id: orderId});
    }

    function addItemToCart(orderItem) {
        return OrderModel.create(orderItem);
    }

    function deleteFromCart(orderId) {
        return OrderModel.remove({_id: orderId});
    }

    function placeOrder(userId, orderInfo) {
        var query = OrderModel.find({userId: userId, ordered: false});
        return OrderModel.update(query,
            {
                ordered: true,
                address: orderInfo.address,
                city: orderInfo.city,
                state: orderInfo.state,
                deliveryDate: orderInfo.date
            },
            {multi: true});
    }
};