define([
    'clientCore/components/base/view/form.view',
    'text!./sign.view.html'
], function (FormView, template) {
    return FormView.extend({
        template: _.template(template),

        className: 'panel mue-panel mue-card mue-card-lagoon',

        triggers: {
            'click [data-link="enter"]': 'enter'
        }
    });
});