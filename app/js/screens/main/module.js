define([
    'app',
    'kernel/components/router/BaseRouter.router',
    './layout.view',

    'clientCore/log/log.service',
    'clientCore/window-title/window-title.service'
], function (App, BaseRouter, MainLayout, $mLog, $mTitle) {
    App.module('Apps.Main', {
        startWithParent: false,

        define: function (Main, App, Backbone, Marionette, $, _) {
            var R = BaseRouter.extend({
                    appRoutes: {
                        main: 'main'
                    },

                    access: {
                        main: {
                            auth: true
                        }
                    },

                    controller: {
                        main: function () {
                            App.startSubApp("Apps.Main", {});
                        }
                    }
                }),
                controller,
                l = $mLog.getLogger('Main');

            var Controller = Marionette.Controller.extend({
                initialize: function () {
                    var layout = new MainLayout();

                    App.body.show(layout);

                    $mTitle.setTitle('Main');
                }
            });

            Main.on('start', function () {
                App.body.reset();
                controller = new Controller();
                l.log("was started");
            });

            Main.on('stop', function () {
                controller.destroy();
                App.body.reset();
                l.log("was stopped");
            });

            App.addInitializer(function () {
                new R();
            });
        }
    });
});