define([
    'marionette',
    'text!./calendar-manager-item.view.html',
    'clientCore/dialog/dialog.service'
], function (Marionette, template, $mDialog) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        events: {
            'click' : '_onClickHandler',
            'click [data-link="remove"]' : '_onRemoveHandler'
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
        },

        _onRemoveHandler: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var me = this;

            $mDialog.confirm({
                text: 'Do you want delete <strong>"' + this.model.get('name') + '"</strong> calendar ?',
                accept: 'Delete'
            }).then(function () {
                me.model.collection.remove(me.model);
                me.model.remove();
            });
        }
    });
});