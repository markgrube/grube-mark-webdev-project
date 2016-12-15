(function() {
        angular
            .module("SeattleGrill")
            .controller("CartController", CartController)
            .controller("CheckoutController", CheckoutController)
            .controller("OrdersController", OrdersController);

        function CartController(OrderService, UserService, $location, $sce) {
            var vm = this;
            vm.checkSafeImageUrl = checkSafeImageUrl;
            vm.deleteFromCart = deleteFromCart;

            function init() {
                UserService
                    .findCurrentUser()
                    .success(function (user) {
                        OrderService
                            .findCartForUser(user._id)
                            .success(function (cart) {
                                if (cart != '0') {
                                    vm.cart = cart;
                                }
                            })
                            .error(function () {
                                console.log("No items in cart.")
                            });
                    })
                    .error(function (){
                        console.log("No user found.")
                    });

            }

            init();

            function deleteFromCart(orderId) {
                OrderService
                    .deleteFromCart(orderId)
                    .success(function() {
                        $location.url('/cart/');
                    })
                    .error(function (){
                        console.log("Failed to delete item from Cart.")
                    });
            }

            function checkSafeImageUrl(url) {
                return $sce.trustAsResourceUrl(url);
            }
        }

        function CheckoutController(OrderService, UserService, $location) {
            var vm = this;
            vm.checkAddress = checkAddress;
            vm.placeOrder = placeOrder;

            function init() {
                UserService
                    .findCurrentUser()
                    .success(function (user) {
                        OrderService
                            .findCartForUser(user._id)
                            .success(function (cart) {
                                if (cart != '0') {
                                    console.log(cart);
                                    vm.cart = cart;
                                }
                            })
                            .error(function () {
                                console.log("No items in cart.")
                            });
                    })
                    .error(function (){
                        console.log("No user found.")
                    });
                geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(47.61, -122.33);
                var mapOptions = {
                    zoom: 8,
                    center: latlng
                };
                map = new google.maps.Map(document.getElementById('map'), mapOptions);
            }
            init();

            function checkAddress(address) {
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == 'OK') {
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(12);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }

            function placeOrder(deliveryInfo) {
                var userId = vm.cart[0].userId;
                OrderService
                    .placeOrder(userId, deliveryInfo)
                    .success(function () {
                        $location.url("/orders")
                    })
                    .error(function () {
                        console.log("Failed to complete order.")
                    })
            }
        }

        function OrdersController(OrderService, UserService, $sce) {
            var vm = this;
            vm.castDate = castDate;

            function init() {
                UserService
                    .findCurrentUser()
                    .success(function (user) {
                        OrderService
                            .findOrdersForUser(user._id)
                            .success(function (orders) {
                                if (orders != '0') {
                                    console.log(orders);
                                    vm.orders = orders;
                                }
                            })
                            .error(function () {
                                console.log("There are no orders to display.")
                            });
                    })
                    .error(function (){
                        console.log("No user found.")
                    });

            }

            function castDate(date){
                return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
            }

            init();

        }
    }
)();