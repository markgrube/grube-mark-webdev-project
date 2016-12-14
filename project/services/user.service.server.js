module.exports = function (app, model) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var cookieParser  = require('cookie-parser');
    var session = require('express-session');

    app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser); //store user data in the session
    passport.deserializeUser(deserializeUser); //fetch object and then attach it to the request object as req.user

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    app.post('/api/user', createUser);
    app.get('/api/user', findCurrentUser);
    app.get('/api/admin/user', adminBypass, findAllUsers);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', loggedInAndSelf, updateUser);
    app.delete('/api/user/:uid', loggedInAndSelf, deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    function localStrategy(username, password, done) {
        model
            .UserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function loggedInAndSelf(req, res, next){
        var loggedIn = req.isAuthenticated();
        var userId = req.params.uid;
        var self = userId == req.user._id;
        if(self && loggedIn) {
            next();
        } else {
            res.sendStatus(400).send("You are not the same person");
        }
    }

    function adminBypass(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == "ADMIN";
        if(loggedIn && isAdmin) {
            next();
        } else {
            res.sendStatus(400).send("Must be logged in as an administrator to perform this action");
        }
    }

    function checkAdmin(req, res) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == "ADMIN";
        if(loggedIn && isAdmin) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function googleStrategy(token, refreshToken, profile, done) {
        model
            .UserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            first: profile.name.givenName,
                            last:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.UserModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function register (req, res) {
        var user = req.body;
        var username = user.username;
        user.password = bcrypt.hashSync(user.password);
        model
            .UserModel
            .findUserByUsername(username)
            .then (
                function(user) {
                    if (user) {
                        res.sendStatus(400).send("Username already taken");
                    } else {
                        return model.UserModel.createUser(req.body)
                    }
                },
                function(error) {
                    res.sendStatus(400).send(error);
                })
            .then (
                function(user) {
                    if(user) {
                        req.login(user, function(err) {
                            if(err) {
                                res.sendStatus(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                }
            )
    }

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        if (user != null){
            delete user.password;
            res.json(user);
        }
        else
        {
            res.sendStatus(404);
        }
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .UserModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findCurrentUser(req, res) {
        var query = req.query;
        if (query.password && query.username){
            findUserByCredentials(req, res);
        } else if (query.username){
            findUserByUsername(req, res);
        } else {
            res.json(req.user);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .UserModel
            .findUserByUsername(username)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err)  {
                    res.send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .UserModel
            .findUserByCredentials(username, password)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err)  {
                    res.send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        model
            .UserModel
            .findUserById(userId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err)  {
                    res.send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        model
            .UserModel
            .findAllUsers()
            .then(
                function (response) {
                    res.json(response);
                },
                function (error)  {
                    res.send(error);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        model
            .UserModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        model
            .UserModel
            .deleteUser(uid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
};