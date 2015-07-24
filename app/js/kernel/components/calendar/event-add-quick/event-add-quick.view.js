define([
    'clientCore/components/base/view/form.view',
    'text!./event-add-quick.view.html'
], function (FormView, template) {
    return FormView.extend({
        template: _.template(template),

        className: 'panel mue-panel mue-form-panel',

        triggers: {
            'submit': 'create',
            'click [data-link="create"]' : 'create',
            'click [data-link="cancel"]' : 'cancel'
        },

        bindings: {
            '[name=title]': {
                observe: 'title'
            }
        },

        onShow: function () {
            this.$el.find('input').focus();
        }
    });
});