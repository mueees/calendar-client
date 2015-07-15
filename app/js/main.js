require([
    'app',
    'jquery',
    'clientCore/notify/notify.service',
    'clientCore/modal/modal.service',
    'kernel/security/security.service',

    //screens
    'screens/sign/module'
], function (App, $, $mNotify, $mModal, $mSecurity) {
    $mNotify.setContainer($('.mue-notify'));

    $mModal.setContainer($('.mue-modal'));

    $mSecurity.setAfterAuth({
        fragment: 'sign'
    });

    App.start();
});