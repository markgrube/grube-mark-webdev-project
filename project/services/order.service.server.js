module.exports = function (app, model) {

    app.post('/api/cart/add', addItemToCart);
    app.get('/api/cart/:uid', findCartForUser);

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
};