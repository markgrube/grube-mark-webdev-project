(function () {
    angular
        .module("SeattleGrill")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/welcome", {
                templateUrl: "views/landing/landing.view.client.html"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin-dashboard.view.client.html",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/admin/users", {
                templateUrl: "views/admin/user-list.view.client.html",
                controller: "UserListController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/admin/products", {
                templateUrl: "views/admin/item-list.view.client.html",
                controller: "ItemListController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/admin/products/new", {
                templateUrl: "views/admin/item-create.view.client.html",
                controller: "ItemCreateController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/admin/products/:iid", {
                templateUrl: "views/admin/item-edit.view.client.html",
                controller: "ItemEditController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/shop", {
                templateUrl: "views/shop/shop.view.client.html",
                controller: "ShopController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/shop/:cat", {
                templateUrl: "views/shop/shop-category.view.client.html",
                controller: "CategoryController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/shop/item/:iid", {
                templateUrl: "views/shop/item.view.client.html",
                controller: "ItemController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/cart", {
                templateUrl: "views/order/cart.view.client.html",
                controller: "CartController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/checkout", {
                templateUrl: "views/order/checkout.view.client.html",
                controller: "CheckoutController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/orders", {
                templateUrl: "views/order/orders.view.client.html",
                controller: "OrdersController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .otherwise({
                redirectTo: "/welcome"
            });


        function checkLogin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(
                    function (user) {
                        if(user != '0') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }

        function checkAdmin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkAdmin()
                .success(
                    function (user) {
                        if(user != '0') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }

    }
})();