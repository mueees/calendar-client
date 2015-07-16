define([
    'marionette',
    'moment',
    'text!./date-switcher.view.html',
    'clientCore/components/calendar/date-viewer/date-viewer.view'
], function (Marionette, moment, template, DateViewer) {
    return Marionette.ItemView.extend({
        template: _.template(template),

        className: 'mue-date-switcher',

        events: {
            'click [data-link="prev"]': 'onPrevHandler',
            'click [data-link="next"]': 'onNextHandler',
            'click [data-link="today"]': 'onTodayHandler'
        },

        ui: {
            'today': '.mue-date-switcher-today'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.setTodayState);
        },

        onRender: function () {
            var dateViewer = new DateViewer({
                model: this.model
            });

            dateViewer.render();

            this.$el.append(dateViewer.$el)

            this.setTodayState();
        },

        onPrevHandler: function () {
            switch (this.model.get('type')) {
                case 1:
                    this.model.set('start', moment(this.model.get('start')).add(-1, 'd').toDate());
                    break;
                case 2:
                    // count of days
                    var period = Math.floor((this.model.get('end') - this.model.get('start')) / (1000 * 60 * 60 * 24));

                    this.model.set({
                        start: moment(this.model.get('start')).add(-period, 'd').toDate(),
                        end: moment(this.model.get('end')).add(-period, 'd').toDate()
                    });

                    break;
                case 3:
                    var start = moment(this.model.get('start')).add(-1, 'M').toDate();
                    this.model.set('start', start);
                    break;
            }
        },

        onNextHandler: function () {
            switch (this.model.get('type')) {
                case 1:
                    this.model.set('start', moment(this.model.get('start')).add(1, 'd').toDate());
                    break;
                case 2:
                    // count of days
                    var period = Math.floor((this.model.get('end') - this.model.get('start')) / (1000 * 60 * 60 * 24));

                    this.model.set({
                        start: moment(this.model.get('start')).add(period, 'd').toDate(),
                        end: moment(this.model.get('end')).add(period, 'd').toDate()
                    });

                    break;
                case 3:
                    this.model.set('start', moment(this.model.get('start')).add(1, 'M').toDate());
                    break;
            }
        },

        onTodayHandler: function () {
            switch (this.model.get('type')) {
                case 1:
                    this.model.set('start', new Date());
                    break;
                case 2:
                    // count of days
                    var period = Math.floor((this.model.get('end') - this.model.get('start')) / (1000 * 60 * 60 * 24));

                    this.model.set({
                        start: new Date(),
                        end: moment(new Date()).add(period, 'd').toDate()
                    });

                    break;
                case 3:
                    this.model.set('start', new Date());
                    break;
            }
        },

        setTodayState: function () {
            var state = true,
                startMoment = moment(this.model.get('start'));

            switch (this.model.get('type')) {
                case 1:
                    state = (startMoment.format('DD') == moment(new Date()).format('DD'));
                    break;
                case 2:
                    state = (startMoment.format('DD') == moment(new Date()).format('DD'));
                    break;
                case 3:
                    state = (startMoment.format('MMMM') == moment(new Date()).format('MMMM'));
                    break;
            }

            this.ui.today.attr('disabled', state);
        }
    });
});