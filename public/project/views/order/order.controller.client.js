(function() {
        angular
            .module("SeattleGrill")
            .controller("CartController", CartController);

        function CartController(OrderService, UserService, $sce) {
            var vm = this;
            vm.checkSafeImageUrl = checkSafeImageUrl;

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

            }

            init();

            function checkSafeImageUrl(url) {
                return $sce.trustAsResourceUrl(url);
            }
        }
    }
)();