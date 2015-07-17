define([
    'clientCore/fake-server/fake-server.service'
], function ($mFakeServer) {

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
});