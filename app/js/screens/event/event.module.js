define([
    'app',
    'backbone',
    'moment',
    'underscore',
    'clientCore/components/router/base.router',
    'kernel/resource/event.model',

    './layout.view',
    'kernel/resource/calendar.collection',
    'kernel/event-storage/event-storage.service',

    // components
    'kernel/components/calendar/event-add/event-add.controller',
    'kernel/components/calendar/event-edit/event-edit.controller'
], function (App, Backbone, moment, _, BaseRouter, EventModel, Layout, CalendarCollection, $mEventStorage, AddEventController, EditEventController) {
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
                        create: function (options) {
                            App.startSubApp("Apps.Event");

                            if (controller) {
                                controller.destroy();
                            }

                            controller = new CreateController(options);
                        },

                        edit: function (options) {
                            App.startSubApp("Apps.Event");

                            if (controller) {
                                controller.destroy();
                            }

                            controller = new EditController(options);
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
                    var me = this,
                        layout = new Layout(),
                        deferred = $.Deferred();

                    App.body.show(layout);

                    if (!$mEventStorage.getEditEvent()) {
                        EventModel.getById(options.parameters[0]).done(function (event) {
                            deferred.resolve(event);
                        });
                    } else {
                        deferred.resolve($mEventStorage.getEditEvent());
                    }

                    deferred.done(function (event) {
                        var editEventController = new EditEventController({
                            region: layout.getRegion('content'),
                            calendars: options.resolve.calendars,
                            event: event
                        });

                        editEventController.show();

                        me.listenTo(editEventController, 'mue:cancel mue:edit', function () {
                            App.navigate("#main", {
                                trigger: true
                            });
                        });
                    });
                }
            });

            Main.on('start', function (arg) {
            });

            Main.on('stop', function () {
                if (controller) {
                    controller.destroy();
                }
            });

            App.addInitializer(function () {
                new R();
            });
        }
    });
});