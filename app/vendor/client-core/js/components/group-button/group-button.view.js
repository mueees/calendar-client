define([
    'marionette',
    'text!./group-button.view.html'
], function (Marionette, template) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        className: 'btn-group',

        events: {
            'click button' : 'onButtonClick'
        },

        initialize: function () {
            this.listenTo(this.model, 'change:items', this.render);
            this.listenTo(this.model, 'change:active', this.onActiveHandler);
        },

        onActiveHandler: function () {
            this.$el.find('.btn-banana').removeClass('btn-banana').addClass('btn-lagoon');
            this.$el.find('button').eq(this.model.get('active')).removeClass('btn-lagoon').addClass('btn-banana');
        },

        onButtonClick: function(e){
            this.model.set('active', $(e.target).attr('data-index'));
        }
    });
});