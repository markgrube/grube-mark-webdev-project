module.exports = function (app, model) {

    app.post('/api/cart/add', addItemToCart);
    app.get('/api/cart/:uid', findCartForUser);
    app.delete('/api/cart/:oid', deleteFromCart);
    app.put('/api/cart/:uid', placeOrder);
    app.get('/api/orders/:uid', findOrdersForUser);

    function addItemToCart(req, res) {
        var item = req.body;
        model
            .OrderModel
            .addItemToCart(item)
            .then(
                function (newItem) {
                    res.send(newItem);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findCartForUser(req, res) {
        var userId = req.params.uid;
        model
            .OrderModel
            .findCartForUser(userId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function deleteFromCart(req, res) {
        var orderId = req.params.oid;
        model
            .OrderModel
            .deleteFromCart(orderId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStaus(400).send(error);
                }
            )
    }

    function placeOrder(req, res) {
        var userId = req.params.uid;
        var orderInfo = req.body;
        model
            .OrderModel
            .placeOrder(userId, orderInfo)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findOrdersForUser(req, res) {
        var userId = req.params.uid;
        model
            .OrderModel
            .findOrdersForUser(userId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (error) {
                    res.send(error);
                }
            );
    }


};