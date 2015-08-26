define([
    'app',
    'clientCore/components/router/base.router',
    'kernel/components/sign/sign.controller',
    './layout.view',

    'clientCore/log/log.service',
    'clientCore/window-title/window-title.service'
], function (App, BaseRouter, SignController, SignLayout, $mLog, $mTitle) {
    App.module('Apps.Sign', {
        startWithParent: false,

        define: function (Sign, App, Backbone, Marionette, $, _) {
            var R = BaseRouter.extend({
                    appRoutes: {
                        '': 'redirect',
                        sign: 'sign'
                    },

                    access: {
                        sign: {
                            auth: false,
                            redirectIfAuth: {
                                fragment: 'main'
                            }
                        }
                    },

                    controller: {
                        sign: function () {
                            App.startSubApp("Apps.Sign", {});
                        },

                        redirect: function () {
                            App.navigate('#sign', {trigger: true});
                        }
                    }
                }),
                controller,
                l = $mLog.getLogger('Sign');

            var Controller = Marionette.Controller.extend({
                initialize: function () {
                    var layout = new SignLayout();

                    App.body.show(layout);

                    $mTitle.setTitle('Sign');

                    var sign = new SignController({
                        region: layout.getRegion('sign')
                    });

                    sign.show();
                }
            });

            Sign.on('start', function () {
                App.body.reset();
                controller = new Controller();
                l.log("was started");
            });

            Sign.on('stop', function () {
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