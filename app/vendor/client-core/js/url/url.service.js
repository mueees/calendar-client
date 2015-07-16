define([
    'backbone',
    'marionette'
], function (Backbone, Marionette) {
    var router = new Marionette.AppRouter();

    function getTotal() {
        return Backbone.history.getTotal();
    }

    function getUrlWithoutHash() {
        return window.location.origin + window.location.pathname;
    }

    function toFragment(route, queryParameters) {
        return router.toFragment(route, queryParameters);
    }

    function setQueryParam(queryName, value) {
        var total = Backbone.history.getTotal(),
            query = total.query;

        delete query[queryName];

        if (value) {
            query[queryName] = value;
        }

        router.navigate(router.toFragment(total.routeString, query), {
            trigger: false
        });
    }

    function setQueryParams(params) {
        if (!_.isObject(params)) {
            return false;
        }

        var total = Backbone.history.getTotal(),
            query = total.query;

        _.each(params, function (queryValue, queryName) {
            delete query[queryName];

            if (queryValue) {
                query[queryName] = queryValue;
            }
        });

        router.navigate(router.toFragment(total.routeString, query), {
            trigger: false
        });
    }

    function getQueryParam(queryName) {
        return (queryName) ? getTotal()['query'][queryName] : null
    }

    return {
        getTotal: getTotal,
        toFragment: toFragment,
        getQueryParam: getQueryParam,
        setQueryParam: setQueryParam,
        setQueryParams: setQueryParams,
        getUrlWithoutHash: getUrlWithoutHash
    }
});