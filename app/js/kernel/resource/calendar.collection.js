define([
    './calendar.model',
    'clientCore/resource/base.collection'
], function (CalendarModel, BaseCollection) {
    return BaseCollection.extend({
        _api: {
            all: '/api/calendar/calendar/all'
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