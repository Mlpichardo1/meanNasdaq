angular.module('meannasdaq').factory('stockDataFactory', stockDataFactory);


function stockDataFactory($http) {
    return {
        stockList: stockList,
        stockDisplay: stockDisplay,
        postComment: postComment,
        searchDisplay: searchDisplay,
        searchAddOne: searchAddOne,
        searchGetAll: searchGetAll
    };

    function stockList() {
        return $http.get('/api/stocks').then(complete).catch(failed);
    }

    function stockDisplay(id) {
        return $http.get('/api/stock/' + id).then(complete).catch(failed);
    }

    function postComment(id, comment) {
        return $http.post('/api/stock/' + id + '/comments', comment).then(complete).catch(failed);
    }
    //'comment' at end is passing in data as second argument, the comment itself

    function searchDisplay(symbol) {
        return $http.get('/api/stocks/search/' + symbol).then(complete).catch(failed);
    }

    function searchAddOne(symbol) {
        return $http.post('/api/stocks/search/', symbol).then(complete).catch(failed);
    }

    function searchGetAll() {
        return $http.get('/api/stocks/search/').then(complete).catch(failed);
    }

function searchList() {
     return $http.get('/api/stocks/search/').then(complete).catch(failed);   
}
    
    function complete(response) {
        return response;
    }

    function failed(error) {
        console.log(error.statusText);
    }
}