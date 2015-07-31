define([
    'marionette',
    'moment',
    './time-picker.view'
], function (Marionette, moment, View) {
    return Marionette.Controller.extend({
        initialize: function (options) {
            var me = this;

            this.options = options || {};
            this.options.settings = this.options.settings || {};
            this.region = options.region;

            this.model = new Backbone.Model({
                time: new Date(),
                label: this.options.settings.label || 'Choose time'
            });

            this.listenTo(this.model, 'change', function(){
                me.trigger('mue:change:time', me.model.get('time'));
            });
        },

        getTime: function () {
            return this.model.get('time');
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