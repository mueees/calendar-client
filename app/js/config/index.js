requirejs.config({
    baseUrl: 'js/',
    paths: {
        clientCore: '../vendor/client-core/js',
        'mue-proxy': '../vendor/mue-proxy/mue-proxy',

        moment: '../vendor/moment-2.10.3/moment',
        marionette: '../vendor/marionette/marionette',
        backbone: "../vendor/backbone/backbone",
        "backbone.wreqr": "../vendor/backbone/backbone.wreqr",
        "backbone.babysitter": "../vendor/backbone//backbone.babysitter",
        "backbone.server": "../vendor/backbone/backbone.server",
        "backbone.queryparam": "../vendor/backbone/backbone.queryparam",
        "backbone.routefilter": "../vendor/backbone/backbone.mueRoutefilter",
        "backbone.validation": "../vendor/backbone/backbone.validation",
        "backbone.stickit": "../vendor/backbone/backbone.stickit",
        "backbone.syphon": "../vendor/backbone/backbone.syphon",
        storage: '../vendor/storage/storage',
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap',
        'hbs': '../vendor/handlebars-0.11.2/handlebars',
        mockajax: '../vendor/jquery-mockjax-2.0.0-beta/mockajax',
        datepicker: '../vendor/bootstrap-datepicker/bootstrap-datepicker',
        timepicker: '../vendor/jquery-timepicker/jquery-timepicker',

        underscore: "../vendor/underscore-1.8.3/underscore",
        jquery: "../vendor/jquery/dist/jquery",

        text: '../vendor/requirejs/text'
    },

    hbs: {
        templateExtension: 'hbs',
        disableI18n: true
    },


    shim: {
        jquery: {
            exports: "jQuery"
        },
        underscore: {
            exports: "_"
        },
        bootstrap: ['jquery'],
        datepicker: ['jquery'],
        timepicker: ['jquery'],
        mockajax: {
            deps: ['jquery'],
            exports: "jQuery"
        }
    }
});