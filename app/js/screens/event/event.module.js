define([
    'app',
    'backbone',
    'moment',
    'underscore',
    'kernel/components/router/BaseRouter.router',

    './layout.view',
    'kernel/resource/calendar.collection',
    'kernel/event-storage/event-storage.service',

    // components
    'kernel/components/calendar/event-add/event-add.controller',
    'kernel/components/calendar/event-edit/event-edit.controller'
], function (App, Backbone, moment, _, BaseRouter, Layout, CalendarCollection, $mEventStorage, AddEventController, EditEventController) {
    App.module('Apps.Event', {
        startWithParent: false,

        define: function (Main, App, Backbone, Marionette, $, _) {
            var R = BaseRouter.extend({
                    appRoutes: {
                        'event/create': 'create',
                        'event/edit/:id': 'edit'
                    },

                    resolve: {
                        create: [
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
                        ],

                        edit: [
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
                        create: {
                            auth: true
                        },

                        edit: {
                            auth: true
                        }
                    },

                    controller: {
                        create: function (resolve) {
                            App.startSubApp("Apps.Event");

                            if (controller) {
                                controller.destroy();
                            }

                            controller = new CreateController({
                                resolve: resolve
                            });
                        },

                        edit: function (resolve) {
                            App.startSubApp("Apps.Event");

                            if (controller) {
                                controller.destroy();
                            }

                            controller = new EditController({
                                resolve: resolve
                            });
                        }
                    }
                }),
                controller;

            var CreateController = Marionette.Object.extend({
                initialize: function (options) {
                    var layout = new Layout();

                    App.body.show(layout);

                    var addEventController = new AddEventController({
                        region: layout.getRegion('content'),
                        calendars: options.resolve.calendars,
                        event: $mEventStorage.getNewEvent()
                    });

                    addEventController.show();

                    this.listenTo(addEventController, 'mue:create mue:cancel', function () {
                        App.navigate("#main", {
                            trigger: true
                        });
                    });
                }
            });

            var EditController = Marionette.Object.extend({
                initialize: function (options) {
                    var layout = new Layout();

                    App.body.show(layout);

                    var editEventController = new EditEventController({
                        region: layout.getRegion('content'),
                        calendars: options.resolve.calendars,
                        event: $mEventStorage.getEditEvent()
                    });

                    editEventController.show();

                    this.listenTo(editEventController, 'mue:cancel mue:edit', function () {
                        App.navigate("#main", {
                            trigger: true
                        });
                    });
                }
            });

            Main.on('start', function (arg) {
            });

            Main.on('stop', function () {
                controller.destroy();
            });

            App.addInitializer(function () {
                new R();
            });
        }
    });
});