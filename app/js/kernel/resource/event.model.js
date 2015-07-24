define([
    'clientCore/resource/base.model'
], function (BaseModel) {
    return BaseModel.extend({
        defaults: {
            title: '',
            description: '',
            start: new Date(),
            end: new Date(),
            isAllDay: false,
            isRepeat: false
        },

        validation: {
            title: {
                required: true
            },
            start: {
                required: true
            },
            end: {
                required: true
            },
            isAllDay: {
                required: true
            },
            isRepeat: {
                required: true
            },
            calendarId: {
                required: true
            }
        },

        initialize: function (options) {
            BaseModel.prototype.initialize.apply(this, arguments);
        }
    });
});