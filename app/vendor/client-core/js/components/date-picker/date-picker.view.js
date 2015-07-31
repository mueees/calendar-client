define([
    'marionette',
    'text!./date-picker.view.html',
    'datepicker'
], function (Marionette, template) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        className: 'mue-date-picker',

        ui: {
            time: '[data-el="time"]'
        },

        initialize: function (options) {
            options = options || {};
            options.settings = options.settings || {};

            this.listenTo(this.model, 'change:disabled', this._onDisableHandler);
        },

        onShow: function () {
            var me = this,
                defaultDatePickerSettings = {
                    autoclose: true,
                    todayHighlight: true,
                    format: 'DD, dd MM yyyy'
                },
                datePickerSettings = _.assign(_.clone(defaultDatePickerSettings), this.options.settings.datepicker);

            this.time = this.ui.time.datepicker(datePickerSettings);

            this.time.on('changeTime', function () {
                me.model.set('time', me.time.datepicker('getTime'));
            });

            this.time.datepicker('setDate', me.model.get('time'));
        },

        _onDisableHandler: function () {
            this.ui.time.prop('disabled', this.model.get('disabled'));
        }
    });
});