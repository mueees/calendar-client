require([
    'app',
    'jquery',
    'clientCore/notify/notify.service',
    'clientCore/modal/modal.service',
    'kernel/security/security.service',
    'kernel/fake-server/fake-server.service',

    //screens
    'screens/sign/module',
    'screens/main/module'
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