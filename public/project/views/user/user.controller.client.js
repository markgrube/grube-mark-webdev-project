(function() {
        angular
            .module("SeattleGrill")
            .controller("LoginController", LoginController)
            .controller("RegisterController", RegisterController)
            .controller("ProfileController", ProfileController);

        function LoginController($location, UserService) {
            var vm = this;
            vm.login = login;

            function login(username, password) {
                UserService
                    .login(username, password)
                    .success(function (user) {
                        if (user == "") {
                            vm.error = "No such user";
                        } else {
                            $location.url("/profile");

                        }
                    })
                    .error(function(){
                        console.log("No user found.")
                    });
            }
        }


        function RegisterController($location, UserService) {
            var vm = this;
            vm.register = register;

            function register(user){
                if(user.username === undefined){
                    vm.error = "Username is required";
                } else if (vm.password === vm.verifyPassword){
                    UserService
                        .register(user)
                        .success(function(user){
                            $location.url("/user/"+user._id);
                        })
                        .error(function(){
                            vm.error = "Username already taken";
                            console.log("Failed to create user.")
                        });
                } else {
                    vm.error = "Passwords do not match";
                }
            }
        }


        function ProfileController(UserService, $location) {
            var vm = this;
            // vm.uid = userId;
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;
            vm.logout = logout;

            function init() {
                UserService
                    .findCurrentUser()
                    .success(function (user) {
                        if (user != '0') {
                            vm.user = user;
                        }
                    })
                    .error(function (){
                        console.log("No user found.")
                    });
            }
            init();

            function updateUser() {
                UserService
                    .updateUser(vm.user._id, vm.user)
                    .success(function (user) {
                        $location.url("/user/" + uid)
                    })
                    .error (function (){
                        console.log("Failed to update user.")
                    });
            }

            function deleteUser() {
                UserService
                    .deleteUser(vm.user._id)
                    .success(function(){
                        $location.url("/login");
                    })
                    .error(function(){
                        console.log("Failed to unregister user.")
                    });
            }

            function logout() {
                UserService
                    .logout()
                    .success(function () {
                        $location.url("/login")
                    })
            }
        }

    }
)();