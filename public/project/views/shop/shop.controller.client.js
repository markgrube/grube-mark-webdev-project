(function() {
        angular
            .module("SeattleGrill")
            .controller("ShopController", ShopController)
            .controller("CategoryController", CategoryController)
            .controller("ItemController", ItemController);

        function ShopController(ShopService, $sce) {
            var vm = this;
            vm.checkSafeImageUrl = checkSafeImageUrl;

            function init() {
                ShopService
                    .findAllItems()
                    .success(function (items) {
                        if (items != '0') {
                            vm.items = items;
                        }
                    })
                    .error(function (){
                        console.log("No items found.")
                    });
            }
            init();

            function checkSafeImageUrl(url){
                return $sce.trustAsResourceUrl(url);
            }
        }

        function CategoryController($routeParams, ShopService, $sce){
            var vm = this;
            var category = $routeParams.cat;
            vm.checkSafeImageUrl = checkSafeImageUrl;

            function init() {
                ShopService
                    .findItemsByCategory(category)
                    .success(function (items) {
                        if (items != '0') {
                            vm.items = items;
                        }
                    })
                    .error(function (){
                        console.log("No items found.")
                    });
            }
            init();

            function checkSafeImageUrl(url){
                return $sce.trustAsResourceUrl(url);
            }
        }


        function ItemController($location, $routeParams, OrderService, ShopService, UserService, $sce) {
            var vm = this;
            var itemId = $routeParams.iid;
            vm.itemId = itemId;

            vm.checkSafeImageUrl = checkSafeImageUrl;
            vm.addToCart = addToCart;

            function init() {
                ShopService
                    .findItemById(itemId)
                    .success(function (item) {
                        if (item != '0') {
                            vm.item = item;
                        }
                    })
                    .error(function (){
                        console.log("No item found.")
                    });
            }
            init();

            function checkSafeImageUrl(url){
                return $sce.trustAsResourceUrl(url);
            }

            function addToCart(itemOrder) {
                UserService
                    .findCurrentUser()
                    .success(function (user) {
                        if (user != '0') {
                            var userId = user._id;
                            var total = itemOrder.price * itemOrder.quantity;
                            var order =
                                {
                                    userId: userId,
                                    itemId: itemOrder.itemId,
                                    itemName: itemOrder.itemName,
                                    itemImage: itemOrder.itemImage,
                                    price: itemOrder.price,
                                    quantity: itemOrder.quantity,
                                    total: total
                                };
                            OrderService
                                .addItemToCart(order)
                                .success(function (order){
                                    $location.url("/cart");
                                })
                                .error(function (){
                                    vm.error = "Failed to add item to cart.";
                                    console.log("Failed to add item to cart.");
                                })
                        }
                    })
                    .error(function (){
                        console.log("No user found.")
                    });
            }
        }
    }
)();