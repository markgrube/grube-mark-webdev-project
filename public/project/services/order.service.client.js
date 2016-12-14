(function () {
    angular
        .module("SeattleGrill")
        .factory("OrderService", OrderService);

    function OrderService($http) {
        var api = {
            addItemToCart: addItemToCart,
            findCartForUser: findCartForUser
        };
        return api;

        function addItemToCart(order) {
            var url = '/api/cart/add';
            return $http.post(url, order);
        }

        function findCartForUser(userId) {
            var url = '/api/cart/' + userId;
            return $http.get(url)
        }

    }
})();