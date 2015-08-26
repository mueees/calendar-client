define([
    'storage'
], function (storage) {
    var tokenName = 'authentication';

    function create(data){
        storage.set(tokenName, data);
    }

    function destroy(){
        storage.set(tokenName, null);
    }

    function isAlive(){
        return Boolean(storage.get(tokenName));
    }

    function getToken(){
        return storage.get(tokenName);
    }

    return {
        create: create,
        destroy: destroy,
        getToken: getToken,
        isAlive: isAlive
    }
});