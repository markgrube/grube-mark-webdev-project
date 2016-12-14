"use strict"
module.exports = function(){

    var model = {};
    var mongoose = require("mongoose");
    var OrderSchema = require("./order.schema.server")();
    var OrderModel = mongoose.model("OrderModel", OrderSchema);

    var api = {
        findCartForUser: findCartForUser,
        findOrderedItemsForUser: findOrderedItemsForUser,
        findOrderItemById: findOrderItemById,
        addItemToCart: addItemToCart,
        checkoutCart: checkoutCart,
        deleteFromCart: deleteFromCart
    };
    return api;

    function findCartForUser (userId) {
        return OrderModel.find({userId: userId, ordered: false});
    }

    function findOrderedItemsForUser (userId) {
        return OrderModel.find({userId: userId, ordered: true});
    }

    function findOrderItemById (orderId) {
        return OrderModel.findOne({_id: orderId});
    }

    function addItemToCart (orderItem) {
        return OrderModel.create(orderItem);
    }

    function checkoutCart (userId) {
        return OrderModel
            .update(
                {
                    userId: userId
                },
                {
                    ordered: true
                }
            );
    }

    function deleteFromCart (orderId) {
        return OrderModel.remove({_id: orderId});
    }
};