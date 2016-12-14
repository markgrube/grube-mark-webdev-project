module.exports = function (app, model) {

    app.get('/api/items', findAllItems);
    app.get('/api/item/:iid', findItemById);
    app.get('/api/items/:cat', findItemsByCategory);
    app.post('/api/item', addItem);
    app.put('/api/item/:iid', updateItem);
    app.delete('/api/item/:iid', deleteItem);


    function findAllItems(req, res) {
        model
            .ShopModel
            .findAllItems()
            .then(
                function (response) {
                    res.json(response);
                },
                function (err)  {
                    res.send(err);
                }
            );
    }

    function findItemById(req, res) {
        var itemId = req.params.iid;
        model
            .ShopModel
            .findItemById(itemId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err)  {
                    res.send(err);
                }
            );
    }

    function findItemsByCategory(req, res) {
        var category = req.params.cat;
        model
            .ShopModel
            .findItemsByCategory(category)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err)  {
                    res.send(err);
                }
            );
    }

    function addItem(req, res) {
        var item = req.body;
        model
            .ShopModel
            .addItem(item)
            .then(
                function (newItem) {
                    res.send(newItem);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateItem(req, res) {
        var item = req.body;
        model
            .ShopModel
            .updateItem(item._id, item)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteItem(req, res) {
        var itemId = req.params.iid;
        model
            .ShopModel
            .deleteItem(itemId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

};