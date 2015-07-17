define([
    'marionette'
], function (Marionette) {
    return Marionette.Object.extend({
        initialize: function (options) {

        },

        show: function () {
            this.region.show(this.view);
        },

        onEnterHandler: function () {

        }
    });
});