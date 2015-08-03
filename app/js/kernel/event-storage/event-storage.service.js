define([], function () {
    var cache = {
        newEvent: null,
        editEvent: null
    };

    function resetCache() {
        cache = {
            newEvent: null,
            editEvent: null
        }
    }

    function setEditEvent(event) {
        cache.editEvent = event;
    }

    function getEditEvent(event) {
        return cache.editEvent;
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
        setEditEvent: setEditEvent,
        getEditEvent: getEditEvent,
        resetCache: resetCache
    }
});