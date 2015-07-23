define([
    'marionette',
    './calendar-manager.view',

    '../calendar-add-quick/calendar-add-quick.controller'
], function (Marionette, CalendarManagerView, CalendarAddQuick) {
    return Marionette.Object.extend({
        initialize: function (options) {
            options = options || {};

            this.region = options.region;

            this.calendars = options.calendars;

            this.view = new CalendarManagerView({
                model: this.agendaModel,
                collection: this.calendars
            });

            this.listenTo(this.view, 'newCalendar', this._onNewCalendarHandler);
        },

        show: function () {
            this.region.show(this.view);
        },

        _onNewCalendarHandler: function () {
            var me = this;

            this.calendarAddQuick = new CalendarAddQuick({
                region: new Marionette.Region({
                    el: this.view.$el.find('.calendar-manager-footer')
                })
            });

            this.calendarAddQuick.show();

            this.listenTo(this.calendarAddQuick, 'create', function (calendar) {
                me.calendars.add(calendar);
            });
        }
    });
});