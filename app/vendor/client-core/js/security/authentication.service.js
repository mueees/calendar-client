define([
    'clientCore/ajax/ajax.service',
    'clientCore/channel/channel.service',
    'clientCore/notify/notify.service',
    './token.service',
    './authentication-proxy.service'
], function ($ajax, $channel, $notify, $token, $proxy) {
    // Authentication is the process of determining whether someone or something is, in fact, who or what it is declared to be.

    var loginPage = null,
        targetPage = null,
        router = new Marionette.AppRouter();

    function login() {
        return $proxy.popup();
    }

    function isLogin() {
        return $token.isAlive();
    }

    function logout() {
        $token.destroy();
    }

    function setLoginPage(page) {
        loginPage = page;
    }

    function setTargetPage(page) {
        targetPage = page;
    }

    function initializeProxy(oauth) {
        $proxy.initialize(oauth);
    }

    function configProxy(config) {
        $proxy.config(config);
    }

    // show error notify
    $ajax.addErrorInterceptor(function (event, jqxhr) {
        var response;

        try {
            response = JSON.parse(jqxhr.responseText);
        } catch (e) {
            response = {
                message: 'Unknown error'
            }
        }

        $notify.notify({
            text: 'Status: ' + jqxhr.status + '. \n ' + response.message,
            type: 'danger'
        });
    });

    $ajax.addErrorInterceptor(function (event, jqxhr) {
        var status = jqxhr.status;

        switch (status) {
            case 401:
                logout();
                _redirectToLoginState();
                break;
        }
    });

    $ajax.addPrefilter(function (options, originalOptions, xhr) {
        if ($token.isAlive()) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + $token.getToken().client_token);
        }
    });

    $channel.on('login:success', _loginSuccess);

    $channel.on('logout:success', _redirectToLoginState);

    function _loginSuccess(data) {
        $token.create({
            client_token: data.client_token
        });

        router.navigate(targetPage.fragment, {
            trigger: true
        });
    }

    function _redirectToLoginState() {
        router.navigate(loginPage.fragment, {
            trigger: true
        });
    }

    return {
        login: login,
        isLogin: isLogin,
        logout: logout,

        setLoginPage: setLoginPage,
        setTargetPage: setTargetPage,

        configProxy: configProxy,
        initializeProxy: initializeProxy,

        navigateToLogin: _redirectToLoginState
    }
});