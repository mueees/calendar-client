require([
    'app',
    'jquery',
    'clientCore/notify/notify.service',
    'clientCore/modal/modal.service',
    'kernel/security/security.service',
    'kernel/ajax/ajax.service',
    'clientCore/ajax-loader/ajax-loader.service',
    /*'kernel/fake-server/fake-server.service',*/

    //screens
    'screens/sign/module',
    'screens/main/module',
    'screens/event/event.module'
], function (App, $, $mNotify, $mModal, $mSecurity) {
    $mNotify.setContainer($('.mue-notify'));

    $mModal.setContainer($('.mue-modal'));

    $mSecurity.setAfterAuth({
        fragment: 'main'
    });

    $mSecurity.setSignPage({
        fragment: 'sign'
    });

    App.start();
});