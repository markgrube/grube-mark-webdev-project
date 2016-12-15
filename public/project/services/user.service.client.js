(function () {
    angular
        .module("SeattleGrill")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findCurrentUser: findCurrentUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register,
            adminDeleteUser: adminDeleteUser,
            demoteUser: demoteUser,
            promoteUser: promoteUser,
            checkLogin: checkLogin,
            checkAdmin: checkAdmin
        };
        return api;

        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function checkAdmin() {
            return $http.post("/api/checkAdmin");
        }

        function findUserById(userId) {
            var url = '/api/user/'+userId;
            return $http.get(url);
        }

        function findCurrentUser() {
            var url = '/api/user';
            return $http.get(url);
        }

        function findAllUsers() {
            var url = '/api/admin/user';
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function login(username, password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            var user = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/register", user);
        }

        function adminDeleteUser(userId) {
            var url = "/api/admin/user/" + userId;
            return $http.delete(url);
        }

        function demoteUser(userId) {
            var url = "/api/user/demote/" + userId;
            return $http.put(url);
        }

        function promoteUser(userId) {
            var url = "/api/user/promote/" + userId;
            return $http.put(url);
        }
    }
})();