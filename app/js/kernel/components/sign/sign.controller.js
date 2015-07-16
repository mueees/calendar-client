define([
    'backbone',
    'marionette',
    'kernel/security/security.service',
    './sign.view'
], function (Backbone, Marionette, $mSecurity, View) {
    return Marionette.Controller.extend({
        initialize: function (options) {
            this.options = options || {};
            this.region = options.region;

            this.view = new View({
                model: new Backbone.Model()
            });

            this.listenTo(this.view, 'enter', this.onEnterHandler);
        },

        show: function () {
            this.region.show(this.view);
        },

        onEnterHandler: function () {
            $mSecurity.sign();
        }
    });
});