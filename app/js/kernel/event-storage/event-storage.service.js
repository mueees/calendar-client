define([
    'kernel/resource/event.model',
    'kernel/resource/event.collection'
], function (EventModel, EventCollection) {
    function get(options) {
        // start
        // end
        // calendarIds
        return EventCollection.get(options);
    }

    return {
        get: get
    };
});