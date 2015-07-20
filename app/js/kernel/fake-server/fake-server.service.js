define([
    'clientCore/fake-server/fake-server.service'
], function ($mFakeServer) {

    // get all applications
    $mFakeServer.setHandler({
        url: "/api/calendar/calendar/all",
        responseTime: 750,
        responseText: [
            {
                _id: '1',
                name: 'Birthday',
                description: 'Friends birthday'
            },
            {
                _id: '2',
                name: 'Home deal',
                description: 'Home tasks'
            },
            {
                _id: '3',
                name: 'Other things',
                description: 'bla bla'
            }
        ]
    });

    // get events by criteria
    $mFakeServer.setHandler({
        url: "/api/calendar/event/get",
        responseTime: 500,
        responseText: [
            {
                _id: '1',
                title: 'Birthday',
                description: 'Friends birthday',
                calendarId: '1'
            },
            {
                _id: '2',
                title: 'Home deal',
                description: 'Home tasks',
                calendarId: '2'
            },
            {
                _id: '3',
                title: 'Other things',
                description: 'bla bla',
                calendarId: '3'
            }
        ]
    });
});