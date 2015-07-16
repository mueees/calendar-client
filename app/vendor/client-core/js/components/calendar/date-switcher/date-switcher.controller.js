define([
    'marionette',
    './date-switcher.view'
], function (Marionette, DateSwitcherView) {
    return Marionette.Controller.extend({
        initialize: function (options) {
            this.options = options || {};
            this.region = options.region;
            this.dateModel = options.model;
        },

        show: function () {
            this.view = new DateSwitcherView({
                model: this.dateModel
            });

            this.region.show(this.view);
        }
    });
});