define([
    'marionette',
    'moment',
    'text!./date-time-picker.view.html',
    'datepicker',
    'timepicker'
], function (Marionette, moment, template) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        className: 'mue-date-time-picker',

        ui: {
            date: '[data-el="date"]',
            start: '[data-el="start"]',
            end: '[data-el="end"]'
        },

        initialize: function (options) {
            options = options || {};
            options.settings = options.settings || {};
        },

        onShow: function () {
            var me = this,
                defaultTimePickerSettings = {
                    autoclose: true,
                    forceRoundTime: true,
                    step: 60
                },
                defaultDatePickerSettings = {
                    autoclose: true,
                    todayHighlight: true,
                    format: 'DD, dd MM yyyy'
                },
                timePickerSettings = _.assign(_.clone(defaultTimePickerSettings), this.options.settings.timepicker),
                datePickerSettings = _.assign(_.clone(defaultDatePickerSettings), this.options.settings.datepicker);

            this.date = this.ui.date.datepicker(datePickerSettings);
            this.date.on('changeDate', function (options) {
                me.model.set('date', options.date);
            });

            this.start = this.ui.start.timepicker(timePickerSettings);
            this.start.on('changeTime', function (options) {
                var currentTime = me.start.timepicker('getTime');

                me.model.set('start', currentTime);
            });

            this.end = this.ui.end.timepicker(timePickerSettings);
            this.end.on('changeTime', function () {
                var currentTime = me.end.timepicker('getTime');

                me.model.set('end', currentTime);
            });

            this.date.datepicker('setDate', me.model.get('date'));
            this.start.timepicker('setTime', me.model.get('start'));
            this.end.timepicker('setTime', me.model.get('end'));
        }
    });
});