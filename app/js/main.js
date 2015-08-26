require([
    'app',
    'jquery',
    'config/app',
    'clientCore/notify/notify.service',
    'clientCore/modal/modal.service',
    'clientCore/security/authentication.service',
    'kernel/ajax/ajax.service',
    'clientCore/ajax-loader/ajax-loader.service',
    /*'kernel/fake-server/fake-server.service',*/

    //screens
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