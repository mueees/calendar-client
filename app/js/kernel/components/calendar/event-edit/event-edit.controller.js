define([
    'app',
    'marionette',
    'moment',
    './event-edit.view',
    'kernel/resource/event.model'
], function (App, Marionette, moment, EditView, EventModel) {
    return Marionette.Object.extend({
        initialize: function (options) {
            options = options || {};

            this.region = options.region;
            this.calendars = options.calendars;
            this.event = options.event;

            this.view = new EditView({
                model: this.event,
                calendars: this.calendars
            });

            this.listenTo(this.view, 'edit', this._onEditHandler);
            this.listenTo(this.view, 'cancel', this._onCancelHandler);
        },

        _onEditHandler: function () {
            var me = this;

            // set default title
            if (!this.event.get('title')) {
                this.event.set('title', 'No title');
            }

            if (this.event.isValid(true)) {
                this.event.save().then(function () {
                    me.trigger('mue:edit', me.event);
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

            this.trigger('mue:cancel');
        },

        show: function () {
            this.region.show(this.view);
        }
    });
});