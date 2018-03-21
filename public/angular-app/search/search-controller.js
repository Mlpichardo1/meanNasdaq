angular.module('meannasdaq').controller('SearchController', SearchController);
function SearchController($route, $routeParams, $window, $location, stockDataFactory, AuthFactory, jwtHelper) {
    var vm = this;

    vm.symbolSearch = function() {
        var symbol = vm.Symbol.toUpperCase();
        var savedSymbol = {
            symbol: vm.Symbol.toUpperCase()
        };

        console.log("vm.symbolSearch", Symbol);
        stockDataFactory.searchDisplay(Symbol).then(function(response) {
            console.log("searchdisplayctrl", response);
            vm.stock = response.data[0];
            console.log('stockdatafactory searchdisplay', vm.stock.Symbol);
            if (response.data) {
                //make ajax call once search is successful to save
                console.log("saved");

                stockDataFactory.searchAddOne({ symbol: Symbol }).then(function(response) {
                    console.log('in searchdisplay after saved', response);
                }).catch(function(error) {
                    // if(error){
                    console.log(error);
                    // }
                });
            }
        }).catch(function(error) {
            if (error) {
                console.log(error);
                vm.error = "No stocks match symbol: " + symbol;
            }
        });
    };

    vm.showSearches = function() {

        console.log("Searches");

        stockDataFactory.searchGetAll().then(function(response) {
            console.log(response.data);
            // $route.reload();
            vm.showSearches = response.data;

        }).catch(function(error) {
            if (error) {
                console.log(error);
                vm.err = "Unable to retrieve searches.";
            }
        });
    };

}