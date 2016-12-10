module.exports = function() {

    var mongoose = require('mongoose');

    return mongoose.Schema({
        username: {type: String, trim: true, lowercase: true, unique: true},
        password: {type: String, trim: true},
        first: {type: String, trim: true},
        last: {type: String, trim: true},
        email: {type: String, trim: true, lowercase: true},
        google: {
            id: String,
            token: String,
            email: String
        },
        role: {type: String, default: "CLIENT", enum: ['ADMIN', 'CLIENT']}
    }, {
        collection: "User",
        timestamps: true
    });
};