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
                templateUrl: "views/admin/user-list.view.client.html",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                // resolve: {
                //     checkLogin: checkLogin
                // }
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/shop", {
                templateUrl: "views/shop/shop.view.client.html",
                controller: "ShopController",
                controllerAs: "model"
            })
            .when("/item", {
                templateUrl: "views/shop/item.view.client.html",
                controller: "ShopController",
                controllerAs: "model"
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