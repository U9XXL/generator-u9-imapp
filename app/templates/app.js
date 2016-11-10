
<%= mainAppId %>.registerModule('<%= appId %>', [])

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('<%= appId %>', {
            url: '/<%= appId %>',
            templateUrl: <%= mainAppId %>.getFullPath('tpls/home.html', '<%= appId %>'),
            controller: '<%= appId %>.HomeCtrl',
            resolve: {
                loadFile: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: '<%= appId %>.file',
                        files: [
                            <%= mainAppId %>.getFullPath('js/controllers/<%= appId %>.HomeCtrl.js', '<%= appId %>'),
                            <%= mainAppId %>.getFullPath('js/utility/<%= appIdUpper %>CONTANTS.js', '<%= appId %>')
                        ]
                    });
                }]
            }
        });          
}]);
