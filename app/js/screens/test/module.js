define([
    'app',
    './first.module'
], function (App) {
    App.module('Apps.Test', {
        startWithParent: true,

        define: function (Test, App, Backbone, Marionette, $, _) {
            Test.on('start', function () {
                console.log('Test start');
            });

            Test.on('stop', function () {
                console.log('Test stop');
            });
        }
    });
});