define([
    'marionette',
    './calendar-agenda.view'
], function (Marionette, AgendaView) {
    return Marionette.Object.extend({
        initialize: function (options) {
            options = options || {};

            this.options = options;
            this.region = options.region;
            this.calendars = options.calendars;

            this.listenTo(this.calendars, 'add', this.onAddHandler);
            this.listenTo(this.calendars, 'remove', this.onRemoveHandler);

            this.view = new AgendaView({
                collection: this.calendars
            });
        },

        onAddHandler: function () {

        },

        onRemoveHandler: function () {

        },

        show: function () {
            this.region.show(this.view);
        },

        onEnterHandler: function () {

        }
    });
});