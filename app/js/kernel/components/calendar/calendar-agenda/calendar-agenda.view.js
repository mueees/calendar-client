define([
    'marionette',
    'text!./calendar-agenda.view.html',
    './calendar-day-agenda.view'
], function (Marionette, template, DayView) {

    return Marionette.CompositeView.extend({
        template: _.template(template),

        childView: DayView,

        childViewContainer: ".mue-agenda-days"
    });
});