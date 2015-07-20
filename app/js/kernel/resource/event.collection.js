define([
    './event.model',
    'clientCore/resource/base.collection'
], function (EventModel, BaseCollection) {
    return BaseCollection.extend(
        {
            _api: {
                get: '/api/calendar/event/get'
            },

            model: EventModel,

            _get: function (options) {
                var deferred = $.Deferred();

                this.fetch({
                    url: this._api.get,
                    type: 'POST',
                    data: JSON.stringify(options),
                    success: function (collection) {
                        deferred.resolve(collection);
                    }
                });

                return deferred.promise();
            }
        },
        {
            get: function (options) {
                return (new this())._get(options);
            }
        }
    );
});