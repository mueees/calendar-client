define([
    'marionette',
    'text!./calendar-agenda.view.html'
], function (Marionette, template) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        serializeData: function () {
            return {
                calendars: this.collection.toJSON()
            }
        }
    });
});