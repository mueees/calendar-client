define([
    'moment',
    'clientCore/fake-server/fake-server.service'
], function (moment, $mFakeServer) {

    // get all calendars
    /*$mFakeServer.setHandler({
        url: "/api/calendar/calendar/all",
        responseTime: 750,
        responseText: [
            {
                _id: '1',
                name: 'Birthday',
                description: 'Friends birthday',
                active: true,
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
                active: true,
                color: 'banana'
            }
        ]
    });*/

    // create calendar
    $mFakeServer.setHandler({
        url: "/api/calendar/calendar/create",
        responseTime: 750,
        responseText: {
            _id: 4
        }
    });

    // create event
    $mFakeServer.setHandler({
        url: "/api/calendar/event/create",
        responseTime: 750,
        responseText: {
            _id: 10
        }
    });

    // delete calendar
    $mFakeServer.setHandler({
        url: "/api/calendar/calendar/delete",
        responseTime: 750,
        responseText: {}
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
        url: "/api/calendar/event/find",
        responseTime: 500,
        responseText: (Math.random() > 0.5) ? event1: event2
    });
});