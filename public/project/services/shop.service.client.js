(function () {
    angular
        .module("SeattleGrill")
        .factory("ShopService", ShopService);

    function ShopService($http) {
        var api = {
            findAllItems: findAllItems,
            findItemById: findItemById,
            findItemsByCategory: findItemsByCategory,
            addItem: addItem,
            updateItem: updateItem,
            deleteItem: deleteItem
        };
        return api;

        function findAllItems() {
            var url = '/api/items';
            return $http.get(url);
        }

        function findItemById(itemId) {
            var url = '/api/item/'+itemId;
            return $http.get(url);
        }

        function findItemsByCategory(category) {
            var url = '/api/items/'+category;
            return $http.get(url);
        }

        function addItem(item) {
            var url = '/api/item'
            return $http.post(url, item);
        }

        function updateItem(itemId, item) {
            var url = '/api/item/'+itemId;
            return $http.put(url, item);
        }

        function deleteItem(itemId) {
            var url = '/api/item/'+itemId;
            return $http.delete(url);
        }
    }
})();