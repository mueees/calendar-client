define([
    'marionette',
    'moment',
    'lodash',
    'clientCore/channel/channel.service',
    'text!./calendar-day-agenda.view.html',
    'kernel/components/calendar/event-add-quick/event-add-quick.controller',
    'clientCore/dialog/dialog.service'
], function (Marionette, moment, _, $mChannel, template, AddEvent, $mDialog) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        className: 'mue-calendar-agenda-day',

        events: {
            'click [data-link="event"]': "onEventHandler",
            'click [data-link="remove"]': "onRemoveHandler",
            'click [data-link="edit"]': "onEditHandler",
            'click [data-link="newEvent"]': "onNewEventHandler"
        },

        initialize: function (options) {
            options = options || {};

            var me = this;

            this.listenTo(this.model, 'change:events', function () {
                me.render();
            });

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

            model.today = momentDate.format('Do dddd, MMMM YYYY') == moment(new Date()).format('Do dddd, MMMM YYYY');
            model.weekend = (momentDate.toDate().getDay() == 6) || (momentDate.toDate().getDay() == 0);

            return model;
        },

        onEventHandler: function (e) {
            var _id = $(e.target).closest('.mue-calendar-agenda-event').attr('data-event-id'),
                event = _.find(this.model.get('events'), function (item) {
                    return item.event.get('_id') == _id;
                });
        },

        onRemoveHandler: function (e) {
            var _id = $(e.target).closest('.mue-calendar-agenda-event').attr('data-event-id'),
                events = this.model.get('events'),
                me = this,
                eventData = _.find(events, function (item) {
                    return item.event.get('_id') == _id;
                });

            $mDialog.confirm({
                text: 'Do you want delete <strong>"' + eventData.event.get('title') + '"</strong> event ?',
                accept: 'Delete'
            }).then(function () {
                eventData.event.remove().then(function () {
                    _.remove(events, function (currentEventData) {
                        return currentEventData.event.get('_id') == eventData.event.get('_id')
                    });

                    me.model.unset('events', {silent: true});
                    me.model.set('events', events);

                    if (eventData.event.get('isRepeat')) {
                        $mChannel.trigger('mue:agenda-day:remove:repeat');
                    }
                });
            });
        },

        onEditHandler: function (e) {
            var _id = $(e.target).closest('.mue-calendar-agenda-event').attr('data-event-id'),
                events = this.model.get('events'),
                eventData = _.find(events, function (item) {
                    return item.event.get('_id') == _id;
                });

            $mChannel.trigger('mue:agenda-day:edit', eventData.event);
        },

        onNewEventHandler: function () {
            var momentDate = moment(this.model.get('date')),
                addEvent = new AddEvent({
                    region: new Marionette.Region({
                        el: this.$el.find('.new-event-region')
                    }),
                    calendars: this.calendars,
                    event: {
                        start: moment(new Date()).set({
                            year: momentDate.year(),
                            month: momentDate.month(),
                            date: momentDate.date()
                        }).toDate(),
                        isAllDay: true
                    }
                });

            addEvent.show();

            this.listenTo(addEvent, 'create', function (event) {
                var data = {
                        event: event,
                        calendar: this.calendars.where({_id: event.get('calendarId')})[0]
                    },
                    events = _.clone(this.model.get('events'));

                events.push(data);

                this.model.set('events', events);
            });
        }
    });
});