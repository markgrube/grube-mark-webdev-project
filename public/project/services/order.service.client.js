(function () {
    angular
        .module("SeattleGrill")
        .factory("OrderService", OrderService);

    function OrderService($http) {
        var api = {
            addItemToCart: addItemToCart,
            findCartForUser: findCartForUser,
            deleteFromCart: deleteFromCart,
            placeOrder: placeOrder,
            findOrdersForUser: findOrdersForUser
        };
        return api;

        function addItemToCart(order) {
            var url = '/api/cart/add';
            return $http.post(url, order);
        }

        function findCartForUser(userId) {
            var url = '/api/cart/' + userId;
            return $http.get(url);
        }

        function deleteFromCart(orderId) {
            var url = '/api/cart/'+orderId;
            return $http.delete(url);
        }

        function placeOrder(userId, deliveryInfo) {
            var url = '/api/cart/'+userId;
            return $http.put(url, deliveryInfo);
        }

        function findOrdersForUser(userId){
            var url = '/api/orders/' + userId;
            return $http.get(url);
        }
    }
})();