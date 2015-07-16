define([
    'app',
    'backbone',
    'kernel/components/router/BaseRouter.router',
    './layout.view',

    'clientCore/log/log.service',
    'clientCore/window-title/window-title.service',

    // components
    'clientCore/components/calendar/date-switcher/date-switcher.controller',
    'clientCore/components/group-button/group-button.view',
    'clientCore/url/url.service',
    'clientCore/helper/helper.service'
], function (App, Backbone, BaseRouter, MainLayout, $mLog, $mTitle, DateSwitcherComponent, GroupButtonView, $mUrl, $mHelper) {
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

                    var startDate = $mUrl.getQueryParam('startDate'),
                        endDate = $mUrl.getQueryParam('endDate'),
                        period = Number($mUrl.getQueryParam('period'));

                    startDate = $mHelper.date.convertStringDate(startDate);
                    endDate = $mHelper.date.convertStringDate(endDate);

                    var dateSwitcherModel = new Backbone.Model({
                        type: Number(period) || 1,
                        start: startDate || new Date(),
                        end: endDate
                    });

                    var dateSwitcherComponent = new DateSwitcherComponent({
                        region: layout.getRegion('dateSwitcher'),
                        model: dateSwitcherModel
                    });

                    dateSwitcherComponent.show();

                    if (period === 0) {

                    }

                    var groupButtonView = new GroupButtonView({
                        model: new Backbone.Model({
                            active: 1,
                            items: [
                                {
                                    name: 'Day',
                                    value: 1
                                },
                                {
                                    name: 'Week',
                                    value: 2
                                },
                                {
                                    name: 'Month',
                                    value: 3
                                },
                                {
                                    name: 'Agenda',
                                    value: 4
                                }
                            ]
                        })
                    });

                    layout.getRegion('datePeriod').show(groupButtonView);
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