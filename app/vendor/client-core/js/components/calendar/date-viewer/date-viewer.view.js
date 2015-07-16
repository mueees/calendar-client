define([
    'marionette',
    'moment',
    'text!./date-viewer.view.html'
], function (Marionette, moment, template) {
    /*
     * type
     * 1 - day
     * 2 - period
     * 3 - month
     * */
    return Marionette.ItemView.extend({
        template: _.template(template),

        tagName: 'SPAN',

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        serializeData: function () {
            return {
                date: this.getDate()
            }
        },

        getDate: function () {
            var date = '',
                model = this.model.toJSON(),
                startMoment = moment(model.start),
                endMoment = moment(model.end);

            switch (model.type) {
                case 1:
                    date = startMoment.format('dddd, DD MMMM, YYYY');
                    break;
                case 2:
                    date = startMoment.format('MMMM DD') + ' - ' + endMoment.format('MMMM DD') + ', ' + startMoment.format('YYYY');
                    break;
                case 3:
                    date = startMoment.format('MMMM') + ' ' + startMoment.format('YYYY');
                    break;
                default:
                    date = startMoment.format('dddd, DD MMMM, YYYY');
                    break;
            }

            return date;
        }
    });
});