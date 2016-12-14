module.exports = function() {

    var mongoose = require('mongoose');

    return mongoose.Schema({
        name: {type: String, trim: true, lowercase: true, unique: true},
        price: {type: Number, trim: true},
        description: {type: String, trim: true},
        category: {type: String, enum: ['GRILL', 'ACCESSORY', 'SAUCE']},
        image: {type: String, trim:true}
    }, {
        collection: "shop",
        timestamps: true
    });
};