define([
    'underscore',
    'moment'
], function (_, moment) {
    var helpers = {
        date: {}
    };

    helpers.date.convertStringDate = function (string) {
        var result = null;

        if (_.isString(string)) {
            if (moment(string).isValid()) {
                result = moment(string).toDate();
            }
        }

        return result;
    };

    return helpers;
});