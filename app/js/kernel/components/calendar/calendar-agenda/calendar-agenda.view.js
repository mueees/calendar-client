define([
    'marionette',
    'text!./calendar-agenda.view.html',
    './calendar-day-agenda.view'
], function (Marionette, template, DayView) {

    return Marionette.CompositeView.extend({
        className: 'panel mue-panel mue-calendar-agenda',
        
        template: _.template(template),

        childView: DayView,

        childViewContainer: ".mue-agenda-days",

        initialize: function (options) {
            options = options || {};

            this.calendars = options.calendars;
        },

        childViewOptions: {
            calendars: this.calendars
        }
    });
});