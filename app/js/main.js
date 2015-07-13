require([
    'app',
    'kernel/security/security.service',
    'clientCore/notify/notify.service',
    'clientCore/modal/modals.service'
], function (App, $mSecurity, $mNotify, $mModal) {

    $mSecurity.setSignPage({
        fragment: 'sign'
    });

    $mSecurity.setAfterAuth({
        fragment: 'dashboard/profile'
    });

    $mNotify.setContainer($('.mue-notify'));

    $mModal.setContainer($('.mue-modal'));

    App.start();
});