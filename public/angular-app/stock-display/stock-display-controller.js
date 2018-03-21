angular.module('meannasdaq').controller('StockController', StockController);

function StockController($route, $routeParams, $window, stockDataFactory, AuthFactory, jwtHelper) {
    var vm = this;
    // vm.title= 'MEAN Nasdaq App';
    var id = $routeParams.id;
    stockDataFactory.stockDisplay(id).then(function(response) {
        console.log(response);
        vm.stock = response.data;
    });
    
    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        }
        else {
            return false;
        }
    };

    vm.addComment = function() {
        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        var username = token.username;

        var postData = {
            //when function runs, returned data is stored in postData
            comment: vm.comment
        };
        if (vm.commentForm.$valid) {
            stockDataFactory.postComment(id, postData).then(function(response) {
                console.log("line 32", response.status);
                if (response.status === 201) {
                    $route.reload();
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
        else {
            vm.isSubmitted = true;
        }
    };
}