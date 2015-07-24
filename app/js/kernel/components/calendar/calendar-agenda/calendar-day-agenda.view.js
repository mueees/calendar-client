define([
    'marionette',
    'moment',
    'underscore',
    'text!./calendar-day-agenda.view.html',
    'kernel/components/calendar/event-add-quick/event-add-quick.controller'
], function (Marionette, moment, _, template, AddEvent) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        className: 'mue-calendar-agenda-day',

        events: {
            'click [data-link="event"]': "onEventHandler",
            'click [data-link="newEvent"]': "onNewEventHandler"
        },

        initialize: function (options) {
            options = options || {};

            this.listenTo(this.model, 'change:events', this.render);

            this.calendars = options.calendars;
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
        },

        onNewEventHandler: function () {
            var addEvent = new AddEvent({
                region: new Marionette.Region({
                    el: this.$el.find('.new-event-region')
                }),
                calendars: this.calendars
            });

            addEvent.show();

            this.listenTo(addEvent, 'create', function(event){
                console.log('cool')
            });
        }
    });
});