require([
    'app',
    'jquery',
    'config/app',
    'clientCore/notify/notify.service',
    'clientCore/modal/modal.service',
    'clientCore/security/authentication.service',
    'clientCore/ajax/ajax.service',
    'clientCore/ajax-loader/ajax-loader.service',

    // route
    'route',

    //screens
    'screens/test/module',
    'screens/sign/module',
    'screens/main/module',
    'screens/event/event.module'
], function (App, $, config, $mNotify, $mModal, $authentication) {
    $mNotify.setContainer($('.mue-notify'));

    $mModal.setContainer($('.mue-modal'));

    $authentication.setTargetPage({
        fragment: 'main'
    });
    $authentication.setLoginPage({
        fragment: 'sign'
    });

    $authentication.configProxy({
        origin: config.proxy.origin
    });
    $authentication.initializeProxy(config.proxy.oauth);

    App.start();
});