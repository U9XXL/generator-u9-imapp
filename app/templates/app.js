

<%= mainAppId %>.registerModule('<%= appId %>', ['<%= appId %>.controllers', '<%= appId %>.services', '<%= appId %>.utility', {
    files: [
        //--inject:lib--//
        //--endinject--//
        //--inject:js--//
        //--endinject--//
    ],
    serie: true,
    cache: false
}])

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('<%= appId %>', {
            url: '/<%= appId %>',
            templateUrl: <%= mainAppId %>.getFullPath('tpls/home.html', '<%= appId %>'),
            controller: '<%= appId %>.HomeCtrl'
        });
}]);
