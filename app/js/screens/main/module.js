define([
    'app',
    'backbone',
    'moment',
    'kernel/components/router/BaseRouter.router',
    './layout.view',

    'clientCore/log/log.service',
    'clientCore/window-title/window-title.service',

    // components
    'clientCore/components/calendar/date-switcher/date-switcher.controller',
    'clientCore/components/group-button/group-button.view',
    'clientCore/url/url.service',
    'clientCore/helper/helper.service',

    // models
    'kernel/resource/calendar.collection'
], function (App, Backbone, moment, BaseRouter, MainLayout, $mLog, $mTitle, DateSwitcherComponent, GroupButtonView, $mUrl, $mHelper, CalendarCollection) {
    App.module('Apps.Main', {
        startWithParent: false,

        define: function (Main, App, Backbone, Marionette, $, _) {
            var R = BaseRouter.extend({
                    appRoutes: {
                        main: 'main'
                    },

                    resolve: {
                        main: [
                            {
                                name: 'calendars',
                                fn: function () {
                                    var def = $.Deferred(),
                                        calendars = new CalendarCollection();

                                    calendars.all().then(function () {
                                        def.resolve(calendars);
                                    });

                                    return def.promise();
                                }
                            }
                        ]
                    },

                    access: {
                        main: {
                            auth: true
                        }
                    },

                    controller: {
                        main: function (resolve) {
                            App.startSubApp("Apps.Main", {
                                resolve: resolve
                            });
                        }
                    }
                }),
                controller,
                l = $mLog.getLogger('Main');

            var Controller = Marionette.Controller.extend({
                initialize: function (options) {
                    var layout = new MainLayout();

                    App.body.show(layout);

                    $mTitle.setTitle('Main');

                    var startDate = $mUrl.getQueryParam('startDate'),
                        endDate = $mUrl.getQueryParam('endDate'),
                        period = Number($mUrl.getQueryParam('period'));

                    startDate = $mHelper.date.convertStringDate(startDate);
                    endDate = $mHelper.date.convertStringDate(endDate);

                    // initialize date periods
                    var groupButtonModel = new Backbone.Model({
                            active: (period || period === 0) ? period : 1,
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
                        }),
                        groupButtonView = new GroupButtonView({
                            model: groupButtonModel
                        });

                    layout.getRegion('datePeriod').show(groupButtonView);

                    // initialize date switcher
                    var dateSwitcherType = _getSwitcherType(period) || 1;

                    function _getSwitcherType(period) {
                        var result;
                        if (period || period === 0) {
                            switch (period) {
                                case 0:
                                    result = 1;
                                    break;
                                case 1:
                                    result = 2;
                                    break;
                                case 2:
                                    result = 3;
                                    break;
                                case 3:
                                    result = 1;
                                    break;
                            }
                        }

                        return result;
                    }

                    var dateSwitcherModel = new Backbone.Model({
                            type: dateSwitcherType,
                            start: startDate || new Date(),
                            end: endDate || moment(new Date()).add(7, 'd').toDate()
                        }),
                        dateSwitcherComponent = new DateSwitcherComponent({
                            region: layout.getRegion('dateSwitcher'),
                            model: dateSwitcherModel
                        });

                    dateSwitcherComponent.show();

                    // listeners
                    this.listenTo(groupButtonModel, 'change:active', function (model, period) {
                        dateSwitcherModel.set('type', _getSwitcherType(Number(period)));
                    });
                }
            });

            Main.on('start', function (arg) {
                App.body.reset();
                controller = new Controller(arg);
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