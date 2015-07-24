define([
    'config/app',
    './calendar.model',
    'clientCore/resource/base.collection'
], function (config, CalendarModel, BaseCollection) {
    return BaseCollection.extend({
        _api: {
            all: config.proxy.origin + '/api/calendar/calendar/all'
        },

        model: CalendarModel,

        all: function () {
            return this.fetch({
                type: "GET",
                url: this._api.all
            });
        }
    });
});