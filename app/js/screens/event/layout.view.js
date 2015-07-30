define([
    'marionette',
    'text!./layout.view.html'
], function (Marionette, layoutTemplate) {
    return Marionette.LayoutView.extend({
        template: _.template(layoutTemplate),
        regions: {
            content: '.content-region'
        }
    })
});