define([
    'marionette',
    'moment',
    './date-picker.view'
], function (Marionette, moment, View) {
    return Marionette.Controller.extend({
        initialize: function (options) {
            var me = this;

            this.options = options || {};
            this.options.settings = this.options.settings || {};
            this.region = options.region;

            this.model = new Backbone.Model({
                time: options.time || new Date(),
                label: this.options.settings.label || 'Choose date',
                disabled: false
            });

            this.listenTo(this.model, 'change', function(){
                me.trigger('mue:change:time', me.model.get('time'));
            });
        },

        getTime: function () {
            return this.model.get('time');
        },

        enable: function () {
            this.model.set('disabled', false);
        },

        disable: function () {
            this.model.set('disabled', true);
        },

        setTime: function (time) {
            this.model.set('time', time);
        },

        show: function () {
            this.view = new View({
                model: this.model,
                settings: this.options.settings
            });

            this.region.show(this.view);
        }
    });
});