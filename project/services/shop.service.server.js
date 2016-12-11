module.exports = function (app, model) {

    app.get('/api/items', findAllItems);
    app.get('/api/item/:iid', findItemById);
    app.get('/api/items/category', findItemsByCategory);
    app.post('/api/item', addItem);


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
        var itemId = req.query.itemId;
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
        var category = req.query.category;
        model
            .ShopModel
            .findItemById(category)
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

};