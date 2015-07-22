define([
    'marionette',
    'moment',
    'underscore',
    'text!./calendar-day-agenda.view.html'
], function (Marionette, moment, _, template) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        className: 'mue-calendar-agenda-day',

        events: {
            'click [data-link="event"]': "onEventHandler"
        },

        initialize: function () {
            this.listenTo(this.model, 'change:events', this.render);
        },

        serializeData: function () {
            var model = this.model.toJSON(),
                momentDate = moment(model.date);

            model.date = moment(model.date).format('Do dddd, MMMM');
            model.date = {
                date: momentDate.format('DD'),
                day: momentDate.format('ddd'),
                month: momentDate.format('MMM')
            };
            model.events = _.map(model.events, function (item) {
                return {
                    event: item.event.toJSON(),
                    calendar: item.calendar.toJSON()
                }
            });

            return model;
        },

        onEventHandler: function (e) {
            var _id = $(e.target).closest('.mue-calendar-agenda-event').attr('data-event-id'),
                event = _.find(this.model.get('events'), function (item) {
                    return item.event.get('_id') == _id;
                });
        }
    });
});