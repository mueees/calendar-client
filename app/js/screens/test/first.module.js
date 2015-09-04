define([
    'app'
], function (App) {
    App.module('Apps.Test.First', {
        startWithParent: false,

        define: function (First, App, Backbone, Marionette, $, _) {
            First.on('start', function () {
                console.log('First start');
            });

            First.on('stop', function () {
                console.log('First stop');
            });
        }
    });
});