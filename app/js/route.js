define([
    'app',
    'clientCore/components/router/base.router'
], function (App, BaseRouter) {
    var Route = BaseRouter.extend({
        appRoutes: {
            'test/first': 'first',
            'test/second': 'second'
        },

        controller: {
            first: function () {
                App.startSubApp("Apps.Test.First", {});
            },

            second: function () {
                App.startSubApp("Apps.Test.Second", {});
            }
        }
    });

    App.addInitializer(function () {
        new Route();
    });
});