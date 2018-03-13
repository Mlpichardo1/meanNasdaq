angular.module('meannasdaq').factory('stockDataFactory', stockDataFactory);

function stockDataFactory($http) {
  return {
    stockList: stockList,
    stockDisplay: stockDisplay,
    postReview: postReview
  };

  function stockList() {
    return $http.get('/api/stocks?count=10').then(complete).catch(failed);
  }

  function stockDisplay(id) {
    return $http.get('/api/stocks/' + id).then(complete).catch(failed);
  }

  function postReview(id, review) {
    return $http.post('/api/stocks/' + id + '/reviews', review).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}