angular.module('meannasdaq').controller('StockController', StockController);

function StockController($route, $routeParams, $window, stockDataFactory, AuthFactory, jwtHelper) {
    var vm = this;
    var id = $routeParams.id;
    var Symbol = $routeParams.Symbol;

    vm.isLoggedIn = function(){
        if (AuthFactory.isLoggedIn){
        return true;
        }else{
        return false;
        }
    };
    
    stockDataFactory.stockDisplay(Symbol).then(function(response){
        vm.stock = response.data;
    });

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