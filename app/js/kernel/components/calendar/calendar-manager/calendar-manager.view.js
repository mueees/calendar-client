define([
    'marionette',
    'text!./calendar-manager.view.html',
    './calendar-manager-item.view'
], function (Marionette, template, CalendarManagerItemView) {
    return Marionette.CompositeView.extend({
        triggers: {
            'click [data-link="new"]': 'newCalendar'
        },

        template: _.template(template),

        childView: CalendarManagerItemView,

        childViewContainer: ".mue-list-group"
    });
});