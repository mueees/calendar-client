define([
    'moment',
    'clientCore/fake-server/fake-server.service'
], function (moment, $mFakeServer) {

    // get all calendars
    $mFakeServer.setHandler({
        url: "/api/calendar/calendar/all",
        responseTime: 750,
        responseText: [
            {
                _id: '1',
                name: 'Birthday',
                description: 'Friends birthday',
                color: 'lagoon'
            },
            {
                _id: '2',
                name: 'Home deal',
                description: 'Home tasks',
                color: 'lagoon'
            },
            {
                _id: '3',
                name: 'Other things',
                description: 'bla bla',
                color: 'banana'
            }
        ]
    });

    var event1 = [
            {
                _id: '1',
                title: 'Birthday',
                description: 'Friends birthday',
                calendarId: '1',
                start: moment(new Date()).add(10, 'm').toDate(),
                end: moment(new Date()).add(20, 'm').toDate(),
                isAllDay: false
            },
            {
                _id: '2',
                title: 'Home deal',
                description: 'Home tasks',
                calendarId: '2',
                start: moment(new Date()).add(50, 'm').toDate(),
                end: moment(new Date()).add(60, 'm').toDate(),
                isAllDay: false
            },
            {
                _id: '3',
                title: 'Other things',
                description: 'bla bla',
                calendarId: '3',
                start: moment(new Date()).add(1, 'm').toDate(),
                end: moment(new Date()).add(65, 'm').toDate(),
                isAllDay: false
            }
        ],

        event2 = [
            {
                _id: '4',
                title: 'Birthday 2',
                description: 'Friends birthday',
                calendarId: '1',
                start: moment(new Date()).add(10, 'm').toDate(),
                end: moment(new Date()).add(20, 'm').toDate(),
                isAllDay: false
            },
            {
                _id: '5',
                title: 'Home deal 2',
                description: 'Home tasks',
                calendarId: '2',
                start: moment(new Date()).add(50, 'm').toDate(),
                end: moment(new Date()).add(60, 'm').toDate(),
                isAllDay: false
            },
            {
                _id: '6',
                title: 'Other things 2',
                description: 'bla bla',
                calendarId: '3',
                start: moment(new Date()).add(1, 'm').toDate(),
                end: moment(new Date()).add(65, 'm').toDate(),
                isAllDay: false
            }
        ];

    // get events by criteria
    $mFakeServer.setHandler({
        url: "/api/calendar/event/get",
        responseTime: 500,
        responseText: (Math.random() > 0.5) ? event1: event2
    });
});