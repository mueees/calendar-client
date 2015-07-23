define([
    'marionette',
    './calendar-add-quick.view',
    'kernel/resource/calendar.model'
], function (Marionette, AddView, CalendarModel) {
    return Marionette.Object.extend({
        initialize: function (options) {
            options = options || {};

            this.region = options.region;

            this.calendar = new CalendarModel();

            this.view = new AddView({
                model: this.calendar
            });

            this.listenTo(this.view, 'create', this._onCreateHandler);
            this.listenTo(this.view, 'cancel', this._onCancelHandler);
        },

        _onCreateHandler: function () {
            var me = this;

            if( this.calendar.isValid(true) ){
                this.calendar.create().then(function () {
                    me.trigger('create', me.calendar);
                    me.region.reset();
                });
            }
        },

        _onCancelHandler: function () {
            this.region.reset();
        },

        show: function () {
            this.region.show(this.view);
        }
    });
});