define([
    'app',
    'marionette',
    './event-add-quick.view',
    'kernel/resource/event.model',
    'kernel/event-storage/event-storage.service'
], function (App, Marionette, AddView, EventModel, $mEventStorage) {
    return Marionette.Object.extend({
        initialize: function (options) {
            options = options || {};

            this.region = options.region;
            this.calendars = options.calendars;

            var event = options.event || {};

            event.calendarId = this.calendars.first().get('_id');

            this.event = new EventModel(event);
            this.view = new AddView({
                model: this.event,
                calendars: this.calendars
            });

            this.listenTo(this.view, 'create', this._onCreateHandler);
            this.listenTo(this.view, 'edit', this._onEditHandler);
            this.listenTo(this.view, 'cancel', this._onCancelHandler);
        },

        _onCreateHandler: function () {
            var me = this;

            // set default title
            if (!this.event.get('title')) {
                this.event.set('title', 'No title');
            }

            if (this.event.isValid(true)) {
                this.event.create().then(function () {
                    me.trigger('create', me.event);
                    me.region.reset();
                });
            } else {
                // clear default title
                if (this.event.get('title') == 'No title') {
                    this.event.set('title', '');
                }
            }
        },

        _onCancelHandler: function () {
            this.region.reset();
        },

        _onEditHandler: function () {
            $mEventStorage.setNewEvent(this.event.toJSON());

            App.navigate('#event/create', {
                trigger: true
            });
        },

        show: function () {
            this.region.show(this.view);
        }
    });
});