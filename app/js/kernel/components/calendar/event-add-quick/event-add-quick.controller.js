define([
    'marionette',
    './event-add-quick.view',
    'kernel/resource/event.model'
], function (Marionette, AddView, EventModel) {
    return Marionette.Object.extend({
        initialize: function (options) {
            options = options || {};

            this.region = options.region;

            this.event = new EventModel({
                title: 'No title'
            });

            this.view = new AddView({
                model: this.event
            });

            this.listenTo(this.view, 'create', this._onCreateHandler);
            this.listenTo(this.view, 'cancel', this._onCancelHandler);
        },

        _onCreateHandler: function () {
            var me = this;

            if( this.event.isValid(true) ){
                this.event.create().then(function () {
                    me.trigger('create', me.event);
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