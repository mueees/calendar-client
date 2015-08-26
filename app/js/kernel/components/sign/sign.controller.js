define([
    'backbone',
    'marionette',
    'clientCore/security/authentication.service',
    'clientCore/channel/channel.service',
    './sign.view'
], function (Backbone, Marionette, $authentication, $channel, View) {
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
            $authentication.login().then(function (data) {
                $channel.trigger('login:success', data);
            });
        }
    });
});