module.exports = function() {

    var mongoose = require('mongoose');

    return mongoose.Schema({
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
        itemId: {type: mongoose.Schema.Types.ObjectId, ref: "shop"},
        itemName: {type: String, trim: true},
        itemImage: {type: String, trim: true},
        price: {type: Number, trim: true},
        quantity: {type: Number, trim: true},
        total: {type: Number, trim: true},
        ordered: {type: Boolean, default: false}
    }, {
        collection: "order",
        timestamps: true
    });
};