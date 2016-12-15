"use strict"
module.exports = function(){

    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        deleteUser: deleteUser,
        demoteUser: demoteUser,
        promoteUser: promoteUser
    };
    return api;

    function createUser (user) {
        return UserModel.create(user);
    }
    
    function findUserByGoogleId(googleId) {
        return UserModel
            .findOne({"google.id": googleId})
    }

    function findUserById(id) {
        return UserModel.findById(id);
    }

    function updateUser(id, user) {
        return UserModel
            .update(
                {
                    _id: id
                },
                {
                    first: user.first,
                    last: user.last,
                    email: user.email
                }
            );
    }

    function findUserByUsername(username) {
        return UserModel
            .findOne({
                username: username
            });
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function deleteUser(id) {
        return UserModel.remove({_id: id});
    }

    function demoteUser(id) {
        return UserModel
            .update(
                {
                    _id: id
                },
                {
                    role: 'CLIENT'
                }
            );
    }

    function promoteUser(id) {
        return UserModel
            .update(
                {
                    _id: id
                },
                {
                    role: 'ADMIN'
                }
            );
    }
};