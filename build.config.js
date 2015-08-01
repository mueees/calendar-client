module.exports = {
    build_dir: 'build',
    compile_dir: 'bin',

    app_files: {
        index: 'app/index.html',
        indexDev: 'app/index-dev.html',
        js: [
            'app/js/**/*.js'
        ],
        templates: [
            'app/js/**/*.html',
            'app/js/**/*.hbs'
        ],
        stylus: {
            default: 'app/stylus/default.styl'
        },
        less: {
            default: 'app/less/default.less'
        }
    },

    vendor_files: {
        js: [
            'app/vendor/requirejs/require.js',
            'app/vendor/requirejs/text.js',
            'app/vendor/jquery/dist/jquery.js',
            'app/vendor/jquery-mockjax-2.0.0-beta/mockajax.js',
            'app/vendor/underscore-1.8.3/underscore.js',
            'app/vendor/bootstrap/dist/js/bootstrap.js',
            'app/vendor/handlebars-0.11.2/handlebars.js',
            'app/vendor/marionette/marionette.js',
            'app/vendor/backbone/backbone.js',
            'app/vendor/backbone/backbone_clear.js',
            'app/vendor/backbone/backbone.babysitter.js',
            'app/vendor/backbone/backbone.queryparam.js',
            'app/vendor/backbone/backbone.routefilter.js',
            'app/vendor/backbone/backbone.server.js',
            'app/vendor/backbone/backbone.stickit.js',
            'app/vendor/backbone/backbone.syphon.js',
            'app/vendor/backbone/backbone.validation.js',
            'app/vendor/backbone/backbone.wreqr.js',
            'app/vendor/storage/storage.js',
            'app/vendor/lodash/lodash.js',
            'app/vendor/mue-proxy/mue-proxy.js',
            'app/vendor/moment-2.10.3/moment.js',
            'app/vendor/bootstrap-datepicker/bootstrap-datepicker.js',
            'app/vendor/jquery-timepicker/jquery-timepicker.js',
            'app/vendor/client-core/js/**/*'
        ],
        css: [
            'app/vendor/bootstrap-datepicker/bootstrap-datepicker.css',
            'app/vendor/jquery-timepicker/jquery-timepicker.css'
        ],
        fonts: [],
        assets: []
    },

    compile_files: {
        js: [
            'app/vendor/requirejs/require.js'
        ]
    }
};