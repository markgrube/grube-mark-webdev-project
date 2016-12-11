(function() {
        angular
            .module("SeattleGrill")
            .controller("ShopController", ShopController)
            .controller("ItemController", ItemController);

        function ShopController($location, ShopService) {
            var vm = this;

            function init() {
                ShopService
                    .findAllItems()
                    .success(function (items) {
                        if (items != '0') {
                            console.log(items);
                            vm.items = items;
                        }
                    })
                    .error(function (){
                        console.log("No items found.")
                    });
            }
            init();
        }


        function ItemController($routeParams, ShopService, $sce) {
            var vm = this;
            var itemId = $routeParams.iid;
            vm.itemId = itemId;

            vm.checkSafeImageUrl = checkSafeImageUrl;

            function init() {
                ShopService
                    .findItemById(itemId)
                    .success(function (item) {
                        if (item != '0') {
                            console.log(item);
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
        }

    }
)();