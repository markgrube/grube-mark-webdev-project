module.exports = function() {

    var mongoose = require('mongoose');

    var OrderSchema = mongoose.Schema({
            userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
            itemId: {type: mongoose.Schema.Types.ObjectId, ref: "shop"},
            itemName: {type: String, trim: true},
            itemImage: {type: String, trim: true},
            price: {type: Number, trim: true},
            quantity: {type: Number, trim: true},
            total: {type: Number, trim: true},
            ordered: {type: Boolean, default: false},
            address: {type: String, trim: true},
            city: {type: String, trim: true},
            state: {type: String, trim: true},
            deliveryDate: {type: Date, trim: true}
        }, {
            collection: "order",
            timestamps: true
        });

    // Setters to handle mongoose .0000000001 issue with aggregate numbers
    OrderSchema.path('price').set(function(num) {
        return num.toFixed(2);
    });
    OrderSchema.path('quantity').set(function(num) {
        return num.toFixed(2);
    });
    OrderSchema.path('total').set(function(num) {
        return num.toFixed(2);
    });

    return OrderSchema;
};