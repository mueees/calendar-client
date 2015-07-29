define([
    'jquery',
    'clientCore/notify/notify.service',
    'clientCore/ajax/ajax.service'
], function ($, $mNotify, $mAjax) {
    $mAjax.addPrefilter(function (options, originalOptions, xhr) {
        options.contentType = 'application/json';
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    });
});