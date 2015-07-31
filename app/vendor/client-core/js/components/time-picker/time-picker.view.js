define([
    'marionette',
    'text!./time-picker.view.html',
    'timepicker'
], function (Marionette, template) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        className: 'mue-time-picker',

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
                defaultTimePickerSettings = {
                    autoclose: true,
                    forceRoundTime: true,
                    step: 60
                },
                timePickerSettings = _.assign(_.clone(defaultTimePickerSettings), this.options.settings.timepicker);

            this.time = this.ui.time.timepicker(timePickerSettings);

            this.time.on('changeTime', function () {
                me.model.set('time', me.time.timepicker('getTime'));
            });

            this.time.timepicker('setTime', me.model.get('time'));

            this.model.set('time', this.time.timepicker('getTime'));
        },

        _onDisableHandler: function () {
            this.ui.time.prop('disabled', this.model.get('disabled'));
        }
    });
});