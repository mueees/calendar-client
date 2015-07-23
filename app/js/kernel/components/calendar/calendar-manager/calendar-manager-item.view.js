define([
    'marionette',
    'text!./calendar-manager-item.view.html'
], function (Marionette, template) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        events: {
            'click' : '_onClickHandler'
        },

        className: 'list-group-item list-group-item-lagoon',

        initialize: function () {
            this.listenTo(this.model, 'change:active', this._onActiveHandler);

            this._onActiveHandler();
        },

        _onActiveHandler: function () {
            if( this.model.get('active') ){
                this.$el.addClass('active');
            }else {
                this.$el.removeClass('active');
            }
        },

        _onClickHandler: function () {
            this.model.set('active', !this.model.get('active'));
        }
    });
});