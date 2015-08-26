define([
    'jquery'
], function ($) {
    function addPrefilter(preFilter) {
        $.ajaxPrefilter(preFilter);
    }

    function addErrorInterceptor(interceptor) {
        $(document).ajaxError(interceptor);
    }

    addPrefilter(function (options, originalOptions, xhr) {
        options.contentType = 'application/json';
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    });

    return {
        addPrefilter: addPrefilter,
        addErrorInterceptor: addErrorInterceptor
    }
});