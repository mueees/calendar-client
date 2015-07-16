define([
    'storage'
], function (storage) {
    var sessionName = 'user';

    function create(credentials) {
        storage.set(sessionName, {
            client_token: credentials.client_token
        });
    }

    function destroy() {
        storage.set(sessionName, null);
    }

    function getSession() {
        return storage.get(sessionName);
    }

    return {
        create: create,
        destroy: destroy,
        getSession: getSession
    }
});