define([
    'marionette',
    'hbs',
    'text!./layout.view.hbs'
], function (Marionette, hbs, layoutTemplate) {
    return Marionette.LayoutView.extend({
        template: hbs.compile(layoutTemplate),
        triggers: {
            'click [data-link="create"]': 'create'
        },
        regions: {
            dateSwitcher: '.date-switcher-region',
            datePeriod: '.date-period-region',
            calendar: '.calendar-region',
            widgetFirst: '.widget-first-region'
        }
    })
});