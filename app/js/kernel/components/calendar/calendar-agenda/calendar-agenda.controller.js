define([
    'marionette',
    './calendar-agenda.view',
    'kernel/resource/event.collection',
    'moment',
    'underscore'
], function (Marionette, AgendaView, EventCollection, moment, _) {
    var DayModel = Backbone.Model.extend({}),
        DayCollection = Backbone.Collection.extend({
            model: DayModel
        });

    return Marionette.Object.extend({
        initialize: function (options) {
            options = options || {};

            _.bindAll(this, '_rebuildAgendaModel');

            this.region = options.region;

            this.calendars = options.calendars;

            this.agendaModel = new Backbone.Model({
                start: options.date.start,
                end: options.date.end,
                days: new DayCollection([])
            });

            this.view = new AgendaView({
                model: this.agendaModel,
                collection: this.agendaModel.get('days'),
                calendars: this.calendars
            });

            this.listenTo(this.agendaModel, 'change:start change:end', this._findEvents);
            this.listenTo(this.calendars, 'change:active', this._findEvents);

            this._findEvents();
        },

        _findEvents: function () {
            var calendarIds = _.map(_.where(this.calendars.toJSON(), {active: true}), '_id');

            if (calendarIds.length) {
                EventCollection.find({
                    start: this.agendaModel.get('start'),
                    end: this.agendaModel.get('end'),
                    calendarIds: calendarIds
                }).then(this._rebuildAgendaModel);
            } else {
                this._rebuildAgendaModel();
            }
        },

        _rebuildAgendaModel: function (eventCollection) {
            var days = this._generateDays(this.agendaModel.get('start'), this.agendaModel.get('end'));

            if (eventCollection) {
                this._populateData(days, eventCollection, this.calendars);
            }

            this.agendaModel.get('days').reset(days);
        },

        _generateDays: function (start, end) {
            var result = [];

            start = new Date(start.getTime());
            end = new Date(end.getTime());

            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);

            while (start <= end) {
                result.push({
                    date: new Date(start.getTime()),
                    events: []
                });

                start.setDate(start.getDate() + 1);
            }

            return result;
        },

        _populateData: function (days, eventCollection, calendarCollection) {
            var format = 'MMMM Do YYYY';

            _.each(days, function (day) {
                var events = eventCollection.filter(function (event) {
                    return moment(day.date).format(format) == moment(event.get('start')).format(format);
                });

                _.each(events, function (event) {
                    day.events.push({
                        event: event,
                        calendar: calendarCollection.find(function (calendar) {
                            return calendar.get('_id') == event.get('calendarId')
                        })
                    })
                });
            });
        },

        setDate: function (date) {
            this.agendaModel.set({
                start: date.start,
                end: date.end
            });
        },

        show: function () {
            this.region.show(this.view);
        }
    });
});