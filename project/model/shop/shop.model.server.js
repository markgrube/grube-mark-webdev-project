"use strict"
module.exports = function(){

    var model = {};
    var mongoose = require("mongoose");
    var ShopSchema = require("./shop.schema.server")();
    var ShopModel = mongoose.model("ShopModel", ShopSchema);

    var api = {
        findAllItems: findAllItems,
        findItemById: findItemById,
        findItemsByCategory: findItemsByCategory,
        addItem: addItem,
        updateItem: updateItem,
        deleteItem: deleteItem
    };
    return api;

    function findAllItems () {
        return ShopModel.find();
    }

    function findItemById (itemId) {
        return ShopModel.findOne({_id: itemId});
    }

    function findItemsByCategory (category) {
        return ShopModel.find({category: category});
    }

    function addItem (item) {
        return ShopModel.create(item);
    }

    function updateItem (itemId, item) {
        return ShopModel
            .update(
                {
                    _id: itemId
                },
                {
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    category: item.category,
                    image: item.image
                }
            );
    }

    function deleteItem (itemId) {
        return ShopModel.remove({_id: itemId});
    }
};