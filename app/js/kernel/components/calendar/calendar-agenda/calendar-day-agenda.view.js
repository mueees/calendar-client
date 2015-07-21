define([
    'marionette',
    'moment',
    'underscore',
    'text!./calendar-day-agenda.view.html'
], function (Marionette, moment, _, template) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        events: {
            'click [data-link="event"]': "onEventHandler"
        },

        initialize: function () {
            this.listenTo(this.model, 'change:events', this.render);
        },

        serializeData: function () {
            var model = this.model.toJSON();

            model.date = moment(model.date).format('Do dddd, MMMM YYYY');
            model.events = _.map(model.events, function (item) {
                return {
                    event: item.event.toJSON(),
                    calendar: item.calendar.toJSON()
                }
            });

            return model;
        },

        onEventHandler: function (e) {
            var _id = $(e.target).closest('li').attr('data-event-id'),
                event = _.find(this.model.get('events'), function (item) {
                    return item.event.get('_id') == _id;
                });
        }
    });
});