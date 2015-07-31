define([
    'marionette',
    'moment',
    './date-time-picker.view'
], function (Marionette, moment, View) {
    return Marionette.Controller.extend({
        initialize: function (options) {
            var me = this,
                now = new Date();

            this.options = options || {};

            this.region = options.region;
            this.model = new Backbone.Model({
                date: now,
                start: now,
                end: moment(now).add(1, 'hours').toDate()
            });

            this.listenTo(this.model, 'change', function(){
                me.trigger('date:change', me.model.toJSON());
            });
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