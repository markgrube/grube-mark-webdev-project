(function() {
        angular
            .module("SeattleGrill")
            .controller("UserListController", UserListController)
            .controller("ItemListController", ItemListController)
            .controller("ItemCreateController", ItemCreateController)
            .controller("ItemEditController", ItemEditController);

        function UserListController(UserService, $location) {
            var vm = this;
            vm.adminDeleteUser = adminDeleteUser;
            vm.demoteUser = demoteUser;
            vm.promoteUser = promoteUser;

            function init() {
                UserService
                    .findAllUsers()
                    .success(function (users) {
                        vm.users = users;
                    })
                    .error(function (){
                        console.log("No users found.")
                    });
            }
            init();

            function adminDeleteUser(userId) {
                UserService
                    .adminDeleteUser(userId)
                    .success(function(){
                        $location.url("/admin/users/");
                    })
                    .error(function(){
                        vm.error = "Failed to delete user.";
                        console.log("Failed to delete user.")
                    });
            }

            function demoteUser(userId) {
                UserService
                    .demoteUser(userId)
                    .success(function () {
                        $location.url("/admin/users/")
                    })
                    .error (function (){
                        vm.error = "Failed to demote user. Are you trying to demote yourself?";
                        console.log("Failed to demote user.")
                    });
            }

            function promoteUser(userId) {
                UserService
                    .promoteUser(userId)
                    .success(function () {
                        $location.url("/admin/users/")
                    })
                    .error (function (){
                        vm.error = "Failed to promote user.";
                        console.log("Failed to promote user.")
                    });
            }
        }

        function ItemListController(ShopService) {
            var vm = this;

            function init() {
                ShopService
                    .findAllItems()
                    .success(function (items) {
                            vm.items = items;
                    })
                    .error(function (){
                        console.log("No items found.")
                    });
            }
            init();
        }

        function ItemCreateController($location, ShopService) {
            var vm = this;
            vm.createItem = createItem;

            function createItem(item) {
                ShopService
                    .addItem(item)
                    .success(function() {
                        $location.url('/admin/products');
                    })
                    .error(function (){
                        console.log("Failed to create product.")
                    });
                $location.url('/admin/products');
            }
        }

        function ItemEditController($routeParams, $location, ShopService) {
            var vm = this;
            var itemId = $routeParams.iid;
            vm.itemId = itemId;

            vm.updateItem = updateItem;
            vm.deleteItem = deleteItem;

            function init() {
                ShopService
                    .findItemById(itemId)
                    .success(function (item) {
                        vm.item = item;
                    })
                    .error(function (){
                        console.log("Item not found.")
                    });
            }
            init();

            function updateItem() {
                ShopService
                    .updateItem(itemId, vm.item)
                    .success(function() {
                        $location.url('/admin/products');
                    })
                    .error(function (){
                        console.log("Failed to update product.")
                    });
                $location.url('/admin/products');
            }

            function deleteItem() {
                ShopService
                    .deleteItem(itemId)
                    .success(function() {
                        $location.url('/admin/products');
                    })
                    .error(function (){
                        console.log("Failed to delete product.")
                    });
            }
        }

    }
)();