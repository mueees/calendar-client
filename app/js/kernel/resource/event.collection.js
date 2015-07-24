define([
    './event.model',
    'clientCore/resource/base.collection'
], function (EventModel, BaseCollection) {
    return BaseCollection.extend(
        {
            _api: {
                find: '/api/calendar/event/find'
            },

            model: EventModel,

            _find: function (options) {
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
            },

            parse: function (response) {
                _.each(response, function (item) {
                    item.start = new Date(item.start);
                    item.end = new Date(item.end);
                });

                return response;
            }
        },
        {
            find: function (options) {
                return (new this())._find(options);
            }
        }
    );
});