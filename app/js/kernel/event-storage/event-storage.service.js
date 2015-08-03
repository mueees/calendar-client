define([], function () {
    var cache = {
        newEvent: null
    };

    function resetCache() {
        cache = {
            newEvent: null
        }
    }

    function setNewEvent(event) {
        cache.newEvent = event;
    }

    function getNewEvent() {
        return cache.newEvent;
    }

    return {
        setNewEvent: setNewEvent,
        getNewEvent: getNewEvent,
        resetCache: resetCache
    }
});