define([
    'jquery',
    'config/app',
    './session.service',
    'mue-proxy'
], function ($, config, $mSession) {
    Mue.initialize(config.proxy.oauth);

    if( config.proxy.origin ){
        Mue.config({
            origin: config.proxy.origin
        });
    }

    function isAuth() {
        return $mSession.getSession();
    }

    function sign() {
        var promise = Mue.popup();

        promise.then(function (data) {
            $mSession.create({
                client_token: data.client_token
            });
        });

        return promise;
    }

    function logout() {
        $mSession.destroy();

        var command = Commands.get('logout');
        return $.when(command.execute());
    }

    return {
        isAuth: isAuth,
        sign: sign,
        logout: logout
    }
});