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
            },
            '[name=calendarId]': {
                observe: 'calendarId'
            }
        },

        initialize: function (options) {
            options = options || {};

            this.calendars = options.calendars;
        },

        serializeData: function () {
            return {
                event: this.model.toJSON(),
                calendars: this.calendars.toJSON()
            }
        },

        onShow: function () {
            this.$el.find('input').focus();
        }
    });
});