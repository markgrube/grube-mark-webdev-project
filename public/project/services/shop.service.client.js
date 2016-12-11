(function () {
    angular
        .module("SeattleGrill")
        .factory("ShopService", ShopService);

    function ShopService($http) {
        var api = {
            findAllItems: findAllItems,
            findItemById: findItemById,
            findItemsByCategory: findItemsByCategory,
            addItem: addItem
        };
        return api;

        function findAllItems() {
            var url = '/api/items';
            return $http.get(url);
        }

        function findItemById(itemId) {
            var url = '/api/items/'+itemId;
            return $http.get(url);
        }

        function findItemsByCategory(category) {
            var url = '/api/items/'+category;
            return $http.get(url);
        }

        function addItem(item) {
            var item = {
                name: item.name,
                category: item.category,
                image: item.image
            };
            return $http.post("/api/item", item);
        }

    }
})();