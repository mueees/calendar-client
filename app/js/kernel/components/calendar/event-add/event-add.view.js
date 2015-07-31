define([
    'marionette',
    'clientCore/components/base/view/form.view',
    'text!./event-add.view.html',
    'clientCore/components/time-picker/time-picker.controller',
    'clientCore/components/date-picker/date-picker.controller'
], function (Marionette, FormView, template, TimePicker, DatePicker) {
    return FormView.extend({
        template: _.template(template),

        className: 'panel mue-panel mue-form-panel',

        events: {
            'click [data-el="end-date-checker"]': '_onEndDateCheckerHandler'
        },

        triggers: {
            'submit': 'create',
            'click [data-link="create"]': 'create',
            'click [data-link="cancel"]': 'cancel'
        },

        ui: {
            title: '[name="title"]',
            allDay: '[data-el="all-day-region"]',
            datePicker: '[data-el="date-picker-region"]',
            endDatePicker: '[data-el="end-date-picker-region"]',
            endDateChecker: '[data-el="end-date-checker"]',
            startTimePicker: '[data-el="time-start-picker-region"]',
            endTimePicker: '[data-el="time-end-picker-region"]',
            isRepeat: '[data-el="is-repeat-region"]'
        },

        bindings: {
            '[name=title]': {
                observe: 'title'
            },
            '[name=calendarId]': {
                observe: 'calendarId'
            },
            '[name=description]': {
                observe: 'description'
            },
            '[name=isAllDay]': {
                observe: 'isAllDay'
            },
            '[name=isRepeat]': {
                observe: 'isRepeat'
            },
            '[name=repeatType]': {
                observe: 'repeatType'
            }
        },

        initialize: function (options) {
            options = options || {};

            this.calendars = options.calendars;

            this.listenTo(this.model, 'change:isAllDay', this._onAllDayHandler);
            this.listenTo(this.model, 'change:isRepeat', this._onRepeatHandler);
            this.listenTo(this.model, 'change:repeatType', this._onRepeatTypeHandler);
            this.listenTo(this.model, 'change', this.__displayModel);
        },

        __displayModel: function () {
            console.log(this.model.toJSON());
        },

        serializeData: function () {
            return {
                event: this.model.toJSON(),
                calendars: this.calendars.toJSON()
            }
        },

        onShow: function () {
            var me = this;

            // init date-picker
            this.datePicker = new DatePicker({
                region: new Marionette.Region({
                    el: this.ui.datePicker
                }),
                settings: {
                    label: 'Date'
                }
            });
            this.datePicker.show();
            this.listenTo(this.datePicker, 'rx:change:time', function (time) {
                me.model.set('date', date);
            });

            // init end-date-picker
            this.endDatePicker = new DatePicker({
                region: new Marionette.Region({
                    el: this.ui.endDatePicker
                }),
                settings: {
                    label: 'End date'
                }
            });
            this.endDatePicker.show();
            this.listenTo(this.endDatePicker, 'rx:change:time', function (date) {
                me.model.set('repeatEnd', date);
            });

            // init start time picker
            this.startTimePicker = new TimePicker({
                region: new Marionette.Region({
                    el: this.ui.startTimePicker
                }),
                settings: {
                    label: 'Start time',
                    timepicker: {
                        step: 30
                    }
                }
            });
            this.startTimePicker.show();
            this.listenTo(this.startTimePicker, 'mue:change:time', function (time) {
                me.model.set('start', time);
            });

            // init end time picker
            this.endTimePicker = new TimePicker({
                region: new Marionette.Region({
                    el: this.ui.endTimePicker
                }),
                settings: {
                    label: 'End time',
                    timepicker: {
                        step: 30
                    }
                }
            });
            this.endTimePicker.show();
            this.listenTo(this.endTimePicker, 'mue:change:time', function (time) {
                me.model.set('end', time);
            });

            this._onAllDayHandler();
            this._onRepeatHandler();
            this._onEndDateCheckerHandler();

            this.ui.title.focus();
        },

        _onAllDayHandler: function () {
            if (this.model.get('isAllDay')) {
                this.ui.allDay.addClass('hidden');
            } else {
                this.ui.allDay.removeClass('hidden');
            }
        },

        _onRepeatHandler: function () {
            if (this.model.get('isRepeat')) {
                this.ui.isRepeat.removeClass('hidden');
            } else {
                this.ui.isRepeat.addClass('hidden');
            }
        },

        _onEndDateCheckerHandler: function () {
            if (this.ui.endDateChecker[0].checked) {
                this.endDatePicker.enable();
            } else {
                this.endDatePicker.disable();
            }
        },

        _onRepeatTypeHandler: function () {
            switch (this.model.get('repeatType')) {
                case 3:
                    break;
                default:

                    break;
            }
        }
    });
});