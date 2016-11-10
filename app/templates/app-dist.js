
<%= mainAppId %>.registerModule('<%= appId %>', [])

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('<%= appId %>', {
            url: '/<%= appId %>',
            templateUrl: <%= mainAppId %>.getFullPath('tpls/home.html', '<%= appId %>'),
            controller: '<%= appId %>.HomeCtrl'
        });          
}]);
