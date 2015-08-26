define([
    'app',
    'marionette',
    'clientCore/security/authentication.service',
    'clientCore/router/before-resolve.extend'
], function (App, Marionette, $authentication) {
    return Marionette.AppRouter.extend({
        before: function (route, name, access) {
            var isLogin = $authentication.isLogin();

            if (access.auth) {
                if (isLogin) {

                } else {
                    $authentication.setTargetPage({
                        fragment: route
                    });

                    this.authError(route, name, access);

                    $authentication.navigateToLogin(route, name, access);

                    return false;
                }
            } else if (access.redirectIfAuth && isLogin) {
                App.navigate('#' + access.redirectIfAuth.fragment, {
                    trigger: true
                });

                return false;
            }
        },

        authError: function (route, name, access) {

        }
    });
});