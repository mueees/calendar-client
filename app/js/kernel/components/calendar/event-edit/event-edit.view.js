define([
    'marionette',
    'moment',
    'clientCore/components/base/view/form.view',
    'text!./event-edit.view.html',
    'clientCore/components/time-picker/time-picker.controller',
    'clientCore/components/date-picker/date-picker.controller'
], function (Marionette, moment, FormView, template, TimePicker, DatePicker) {
    return FormView.extend({
        template: _.template(template),

        className: 'panel mue-panel mue-form-panel mue-event-edit',

        events: {
            'click [data-el="end-date-checker"]': '_onEndDateCheckerHandler'
        },

        triggers: {
            'submit': 'edit',
            'click [data-link="edit"]': 'edit',
            'click [data-link="cancel"]': 'cancel'
        },

        ui: {
            title: '[name="title"]',
            allDay: '[data-el="all-day-region"]',
            repeatDays: '[data-el="repeat-days-region"]',
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
                observe: 'repeatType',
                selectOptions: {
                    collection: function() {
                        return [
                            {
                                value:1, label:'Daily'
                            },
                            {
                                value:2, label: 'Weekly'
                            },
                            {
                                value:3, label: 'Monthly'
                            },
                            {
                                value:4, label: 'Yearly'
                            }
                        ];
                    }
                }
            },
            '[name="repeatDays"]' : {
                observe: 'repeatDays'
            }
        },

        initialize: function (options) {
            FormView.prototype.initialize.apply(this, arguments);

            options = options || {};

            this.calendars = options.calendars;

            this.listenTo(this.model, 'change:isAllDay', this._onAllDayHandler);
            this.listenTo(this.model, 'change:isRepeat', this._onRepeatHandler);
            this.listenTo(this.model, 'change:repeatType', this._onRepeatTypeHandler);
            this.listenTo(this.model, 'change', function(model){
                console.log(model.toJSON());
            });
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
                    label: ' '
                },
                time: this.model.get('start')
            });
            this.datePicker.show();
            this.listenTo(this.datePicker, 'mue:change:time', function (time) {
                var momentTime = moment(time),
                    newStart = moment(me.model.get('start'))
                        .set({
                            year: momentTime.year(),
                            month: momentTime.month(),
                            date: momentTime.date()
                        }).toDate(),
                    newEnd = moment(me.model.get('end'))
                        .set({
                            year: momentTime.year(),
                            month: momentTime.month(),
                            date: momentTime.date()
                        }).toDate();

                me.model.set({
                    start: newStart,
                    end: newEnd
                });
            });

            // init end-date-picker
            this.endDatePicker = new DatePicker({
                region: new Marionette.Region({
                    el: this.ui.endDatePicker
                }),
                settings: {
                    label: 'End date'
                },
                time: this.model.get('repeatEnd')
            });
            this.endDatePicker.show();
            this.listenTo(this.endDatePicker, 'mue:change:time', function (date) {
                me.model.set('repeatEnd', moment(date).add(5, 'hours').toDate());
            });

            // init start time picker
            this.startTimePicker = new TimePicker({
                region: new Marionette.Region({
                    el: this.ui.startTimePicker
                }),
                settings: {
                    label: ' ',
                    timepicker: {
                        step: 30
                    }
                }
            });
            this.listenTo(this.startTimePicker, 'mue:change:time', function (time) {
                var momentTime = moment(time),
                    newTime = moment(me.model.get('start'))
                        .set({
                            hour: momentTime.hours(),
                            minute: momentTime.minutes()
                        }).toDate();

                me.model.set('start', newTime);
            });
            this.startTimePicker.setTime(this.model.get('start'));
            this.startTimePicker.show();

            // init end time picker
            this.endTimePicker = new TimePicker({
                region: new Marionette.Region({
                    el: this.ui.endTimePicker
                }),
                settings: {
                    label: ' ',
                    timepicker: {
                        step: 30
                    }
                }
            });
            this.listenTo(this.endTimePicker, 'mue:change:time', function (time) {
                var momentTime = moment(time),
                    newTime = moment(me.model.get('end'))
                        .set({
                            hour: momentTime.hours(),
                            minute: momentTime.minutes()
                        }).toDate();

                me.model.set('end', newTime);
            });
            this.endTimePicker.setTime(this.model.get('end'));
            this.endTimePicker.show();

            this._onAllDayHandler();
            this._onRepeatHandler();
            this._onEndDateCheckerHandler();
            this._onRepeatTypeHandler();

            this.ui.title.focus();
        },

        _onAllDayHandler: function () {
            if (this.model.get('isAllDay')) {
                this.startTimePicker.disable();
                this.endTimePicker.disable();
            } else {
                this.startTimePicker.enable();
                this.endTimePicker.enable();
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
                this.model.set('repeatEnd', null);
            }
        },

        _onRepeatTypeHandler: function () {
            var repeatType = this.model.get('repeatType');

            if( !repeatType ){
                this.model.set('repeatType', 1);
            }

            if (repeatType && repeatType == 2) {
                // this is weekly type, user should choose repeat days
                this.ui.repeatDays.removeClass('hidden');
            } else {
                this.ui.repeatDays.addClass('hidden');
            }
        }
    });
});