define([
    'marionette',
    './calendar-agenda.view',
    'kernel/event-storage/event-storage.service',
    'moment',
    'underscore'
], function (Marionette, AgendaView, EventStorage, moment, _) {
    return Marionette.Object.extend({
        initialize: function (options) {
            options = options || {};

            this.options = options;
            this.region = options.region;
            this.calendars = options.calendars;
            this.date = options.date;

            this.listenTo(this.calendars, 'add', this.onAddHandler);
            this.listenTo(this.calendars, 'remove', this.onRemoveHandler);

            this.agendaModel = new Backbone.Model({
                defaults: {
                    start: this.date.start,
                    end: this.date.end,
                    days: [
                        {
                            date: new Date(),
                            event: '<eventModel>',
                            calendar: '<calendarModel>'
                        }
                    ]
                }
            });

            this.view = new AgendaView({
                model: this.agendaModel
            });

            this._getEvents();
        },

        _getEvents: function () {
            EventStorage.get({
                start: this.date.start,
                end: this.date.end,
                calendarIds: _.map(this.calendars.toJSON(), '_id')
            }).then(this._rebuildModel);
        },

        _rebuildModel: function (eventCollection) {

        },

        onAddHandler: function () {

        },

        onRemoveHandler: function () {

        },

        show: function () {
            this.region.show(this.view);
        },

        onEnterHandler: function () {

        }
    });
});